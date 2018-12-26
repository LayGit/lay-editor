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
    }
  }

  componentWillUnmount() {
    this.clearProgressTimer()
  }

  clearProgressTimer() {
    clearInterval(this.progressTimer)
  }

  onFileDrop = (e) => {
    this.setState({ dragState: e.type })
  }

  saveUpload = (node) => {
    this.upload = node
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
    const targetItem = getFileItem(file, fileList)
    // removed
    if (!targetItem) {
      return
    }
    targetItem.error = error
    targetItem.response = response
    targetItem.status = 'error'
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
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
    targetItem.status = 'done'
    targetItem.response = response
    this.onChange({
      file: { ...targetItem },
      fileList,
    })
  }

  beforeUpload = (file, fileList) => {
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
    const dragCls = classNames('lay-editor-upload-drag', {
      'lay-editor-upload-drag-hover': this.state.dragState === 'dragover'
    })

    const uploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload
    }

    const { accept, maxSize } = this.props

    let acceptFmt = accept ? accept.replace(/image\//g, '') : '所有格式'
    let maxSizeLimit = maxSize > 0 ? `大小不超过 ${maxSize / 1024 / 1024}m` : '不限大小'

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
              <p className="lay-editor-upload-text">点击或拖放文件到此处上传</p>
              <p className="lay-editor-upload-hint">{`支持 ${acceptFmt}，${maxSizeLimit}`}</p>
            </div>
          </RcUpload>
        </div>
      </span>
    )
  }
}
