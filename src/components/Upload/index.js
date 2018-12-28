import React, { Component } from 'react'
import RcUpload from 'rc-upload'
import Icon from '../Icon'
import { fileToObject, genPercentAdd, getFileItem, removeFileItem } from '../../utils/upload'
import uniqBy from 'lodash/uniqBy'
import classNames from 'classnames'

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
      status: 'normal',
      data: {}
    }
  }

  componentWillUnmount() {
    this.clearProgressTimer()
    this.clearErrorTimer()
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer)
  }

  clearErrorTimer() {
    clearTimeout(this.errorTimer)
  }

  onFileDrop = (e) => {
    this.setState({ dragState: e.type })
  }

  saveUpload = (node) => {
    this.upload = node
  }

  changeStatus(status) {
    this.setState({ status })
  }

  onStart = (file) => {
    const targetItem = fileToObject(file)
    targetItem.status = 'uploading'

    const nextFileList = this.state.fileList.concat()
    const fileIndex = nextFileList.findIndex(({ uid }) => uid === targetItem.uid)
    if (fileIndex === -1) {
      nextFileList.push(targetItem)
    } else {
      nextFileList[fileIndex] = targetItem
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    })

    // fix ie progress
    if (!window.FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  }

  onError = (error, response, file) => {
    this.clearProgressTimer()
    const fileList = this.state.fileList
    let targetItem = getFileItem(file, fileList)

    if (!targetItem) {
      targetItem = {}
      fileList.push(targetItem)
    }

    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'
    this.onChange({
      file: { ...targetItem },
      fileList,
    })

    this.errorTimer = setTimeout(() => {
      this.setState({ fileList: [] })
    }, 3000)
  }

  onProgress = (e, file) => {
    const fileList = this.state.fileList
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.percent = e.percent
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList,
    })
  }

  onSuccess = (response, file) => {
    this.clearProgressTimer()
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }
    const fileList = this.state.fileList
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }

    const { onResult, onUrl } = this.props
    let url = response
    if (onResult) {
      try {
        url = onResult(url)
      } catch (err) {
        this.onError(err, response, file)
        return
      }
    }

    targetItem.status = 'done'
    targetItem.response = response

    this.onChange({
      file: { ...targetItem },
      fileList,
    })

    if (targetItem.status === 'done') {
      onUrl(url)
    }
  }

  beforeUpload = (file, fileList) => {
    if (fileList.length > 1) {
      return false
    }

    const { maxSize, dataFn } = this.props
    if (maxSize > 0 && file.size > maxSize) {
      this.onError('文件大小超限', null, file)
      return false
    }

    // if has dataFn
    if (dataFn && typeof dataFn === 'function') {
      return new Promise((resolve, reject) => {
        const dfp = dataFn(file)
        dfp.then(d => {
          if (d.domain) {
            d['x:domain'] = d.domain
            delete d.domain
          }
          if (d.style) {
            d['x:style'] = d.style
            delete d.style
          }
          this.setState({ data: d })
          resolve()
        }).catch(e => {
          reject()
          this.onError(e, null, file)
        })
      })
    }

    if (!this.props.beforeUpload) {
      return true
    }

    const result = this.props.beforeUpload(file, fileList)
    if (result === false) {
      this.onChange({
        file,
        fileList: uniqBy(
          this.state.fileList.concat(fileList.map(fileToObject)),
          item => item.uid,
        ),
      });
      return false;
    } else if (result && result.then) {
      return result;
    }
    return true
  }

  autoUpdateProgress = (_, file) => {
    const getPercent = genPercentAdd()
    let curPercent = 0
    this.clearProgressTimer()
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent)
      this.onProgress(
        {
          percent: curPercent * 100,
        },
        file,
      )
    }, 200)
  }

  onChange = (info) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList })
    }

    const { onChange } = this.props
    if (onChange) {
      onChange(info)
    }
  }

  render () {

    const { fileList, dragState, data } = this.state

    const dragCls = classNames('lay-editor-upload-drag', {
      'lay-editor-upload-drag-hover': dragState === 'dragover'
    })

    const uploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload,
      data: {
        ...this.props.data,
        ...data
      }
    }

    const { accept, maxSize, locale } = this.props

    let acceptFmt = accept ? accept.replace(/image\//g, '') : locale.format('toolbar.image.upload.drag.hint.acceptAll')
    let maxSizeLimit = maxSize > 0 ? `${locale.format('toolbar.image.upload.drag.hint.size.limit')} ${maxSize / 1024 / 1024}m` : locale.format('toolbar.image.upload.drag.hint.size.infinite')

    const file = fileList.length > 0 ? fileList[0] : {}
    let error = file.error
    if (typeof error === 'object') {
      error = JSON.stringify(error)
    }

    return (
      <span className="lay-editor-upload">
        <div
          className={dragCls}
          onDrop={this.onFileDrop}
          onDragOver={this.onFileDrop}
          onDragLeave={this.onFileDrop}
          style={{ marginBottom: 8 }}>
          <RcUpload
            {...uploadProps}
            ref={this.saveUpload}
            className="lay-editor-upload-btn">
            <div className="lay-editor-upload-drag-container">
              <p className="lay-editor-upload-drag-icon">
                <Icon type="icon-inbox" />
              </p>
              <p className="lay-editor-upload-text">{locale.format('toolbar.image.upload.drag.title')}</p>
              <p className="lay-editor-upload-hint">{`${locale.format('toolbar.image.upload.drag.hint.support')} ${acceptFmt}，${maxSizeLimit}`}</p>
              {file.status === 'error' && (
                <p className="lay-editor-upload-error">{locale.format('toolbar.image.upload.failed')}:{error}</p>
              )}
            </div>
          </RcUpload>
          {file.status === 'uploading' && (
            <div className="lay-editor-upload-progress">
              <div className="lay-editor-upload-progress-wrapper">
                <div className="lay-editor-upload-progress-loading"></div>
                <div className="lay-editor-upload-progress-percent">{file.percent ? `${Number(file.percent).toFixed(0)}%` : ''}</div>
              </div>
              <div className="lay-editor-upload-progress-hint">{locale.format('toolbar.image.upload.uploading')}...</div>
            </div>
          )}
        </div>
      </span>
    )
  }
}
