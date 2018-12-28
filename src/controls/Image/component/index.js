import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'
import Modal from '../../../components/Modal'
import Upload from '../../../components/Upload'
import Tabs, { TabPane } from 'rc-tabs'
import TabBar from 'rc-tabs/lib/TabBar'
import TabContent from 'rc-tabs/lib/TabContent'

const QINIU_SERVER = {
  'z0': '//upload.qiniup.com',
  'z1': '//upload-z1.qiniup.com',
  'z2': '//upload-z2.qiniup.com',
  'na0': '//upload-na0.qiniup.com',
  'as0': '//upload-as0.qiniup.com'
}

const pathJoin = (p1, p2) => {
  if (p1[p1-1] === '/') {
    if (p2[0] === '/') {
      p2 = p2.substr(1)
    }
  } else {
    if (p2[0] !== '/') {
      p2 = '/' + p2
    }
  }
  return p1 + p2
}

const UploadTab = (props) => {

  const getMaxSize = () => {
    let maxSize = props.config.maxSize
    if (!/^\d+(\.\d+)?[m|k]?$/.test(maxSize)) {
      return 0
    }

    if (isNaN(maxSize)) {
      // support 'm' and 'k' unit size string
      const unit = maxSize[maxSize.length - 1]
      const maxSizeNum = Number(maxSize.substr(0, maxSize.length - 1))
      maxSize = unit == 'm' ? maxSizeNum * 1024 * 1024 : maxSizeNum * 1024
    }

    // get file size limit
    return maxSize
  }

  // get base64 upload props
  const getBase64UploadProps = () => {
    const beforeUpload = (file) => {
      const reader = new FileReader()
      let imageUrl64 = reader.readAsDataURL(file)
      reader.onload = () => {
        props.onChange(reader.result)
      }
      return false
    }
    return {
      beforeUpload
    }
  }

  // get server upload props
  const getServerUploadProps = () => {
    const { onChange, config } = props
    const { server: { url, data, headers, file, withCredentials, resultFn } } = config
    return {
      action: url,
      name: file,
      data,
      headers,
      withCredentials,
      onResult: resultFn,
      onUrl: onChange
    }
  }

  // get qiniu upload props
  const getQiniuUploadProps = () => {
    const { onChange, config } = props
    const { qiniu: { area, key, token, domain, style = '', dataFn } } = config

    return {
      action: area ? QINIU_SERVER[area] : QINIU_SERVER['z0'],
      data: {
        key,
        token,
      },
      onResult: (res) => {
        let url = pathJoin(domain, res.key)
        if (res['x:domain']) {
          url = pathJoin(res['x:domain'], res.key)
        }

        if (res['x:style']) {
          url += res['x:style']
        } else {
          url += style
        }

        return url
      },
      onUrl: onChange,
      dataFn
    }
  }

  // get aliyun oss uplaod props
  const getAliyunUploadProps = () => {
    const { onChange, config } = props
    const { aliyun: { accessKeyId, domain, policy, sign, key, dataFn } } = config

    return {
      action: domain,
      data: {
        OSSAccessKeyId: accessKeyId,
        policy,
        Signature: sign,
        key,
        success_action_status: '201'
      },
      onResult: (res) => {
        return /<Location>(.*)<\/Location>/.exec(res)[1]
      },
      onUrl: onChange,
      dataFn
    }
  }

  // get upyun upload props
  const getUpyunUploadProps = () => {

  }

  const getUploadProps = () => {
    const { upto, accept } = props.config
    let uploadProps
    switch (upto) {
      case 'server':
        uploadProps = getServerUploadProps()
        break
      case 'qiniu':
        uploadProps = getQiniuUploadProps()
        break
      case 'aliyun':
        uploadProps = getAliyunUploadProps()
        break
      case 'upyun':
        uploadProps = getUpyunUploadProps()
        break
      default:
        uploadProps = getBase64UploadProps()
    }

    const { beforeUpload, ...restProps } = uploadProps

    return {
      upto,
      accept,
      beforeUpload,
      maxSize: getMaxSize(),
      ...restProps
    }
  }

  const onReset = () => {
    props.onChange('')
  }

  const {
    config,
    src,
    upto,
    locale,
  } = props

  const uploadProps = getUploadProps()

  return src ? (
    <div className="lay-editor-image-preview">
      <img src={src} />
      <div
        onClick={onReset}
        className="lay-editor-image-preview-del">
        <Icon type="icon-chexiao" /> {locale.format('toolbar.image.upload.reset')}
      </div>
    </div>
  ) : (
    <Upload {...uploadProps} locale={locale} />
  )
}

const NetworkTab = (props) => {
  const { src, onChange, locale } = props
  const onInputChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className="lay-editor-form">
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">{locale.format('toolbar.image.form.label.url')}</div>
        <div className="lay-editor-form-item-control">
          <input className="lay-editor-input" placeholder="http://" value={src} onChange={onInputChange} />
        </div>
      </div>
    </div>
  )
}

const ImageSettings = (props) => {
const { state, updateState, altEnabled, locale } = props
  const { width, height, alt } = state
  return (
    <div className="lay-editor-form">
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">{locale.format('toolbar.image.form.label.width')}</div>
        <div className="lay-editor-form-item-control">
          <input
            className="lay-editor-input"
            placeholder="auto"
            value={width}
            onChange={e => updateState({ width: e.target.value }) } />
        </div>
      </div>
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">{locale.format('toolbar.image.form.label.height')}</div>
        <div className="lay-editor-form-item-control">
          <input
            className="lay-editor-input"
            placeholder="auto"
            value={height}
            onChange={e => updateState({ height: e.target.value })} />
        </div>
      </div>
      {altEnabled && (
        <div className="lay-editor-form-item">
          <div className="lay-editor-form-item-label">{locale.format('toolbar.image.form.label.alt')}</div>
          <div className="lay-editor-form-item-control">
            <input
              className="lay-editor-input"
              placeholder=""
              value={alt}
              onChange={e => updateState({ alt: e.target.value })} />
          </div>
        </div>
      )}
    </div>
  )
}

export default class LayoutComponent extends Component {
  constructor(props) {
    super(props)
    const { defaultSize = {} } = props.config
    this.defaultState = {
      tabActiveKey: "local",
      src: '',
      alt: '',
      width: defaultSize.width || 'auto',
      height: defaultSize.height || 'auto'
    }
    this.state = {
      ...this.defaultState
    }
  }

  onTabChange = (key) => {
    this.setState({ tabActiveKey: key, images: [] })
  }

  addImageFromState = () => {
    let { src, height, width, alt } = this.state
    const { onChange } = this.props
    
    if (!isNaN(height)) {
      height += 'px'
    }
    if (!isNaN(width)) {
      width += 'px'
    }
    onChange(src, height, width, alt)
    // 重置状态
    this.setState({ ...this.defaultState })
  }

  render () {
    const {
      config: { icon, title, altEnabled },
      dialogVisible,
      showDialog,
      hideDialog,
      locale,
    } = this.props

    const { tabActiveKey, src } = this.state

    const getImageSettingsComponent = () => {
      return (
        <ImageSettings
          locale={locale}
          altEnabled={altEnabled}
          state={this.state}
          updateState={props => this.setState(props)} />
      )
    }

    const overlay = (
      <Tabs
        style={{ borderRight: 'none' }}
        activeKey={tabActiveKey}
        onChange={this.onTabChange}
        tabBarPosition="left"
        renderTabBar={()=><TabBar />}
        renderTabContent={()=><TabContent animated={false} />}>
        <TabPane tab={locale.format('toolbar.image.upload.local')} key="local">
          <UploadTab src={src} onChange={(src) => this.setState({ src })} config={this.props.config} locale={locale} />
          {getImageSettingsComponent()}
        </TabPane>
        <TabPane tab={locale.format('toolbar.image.upload.network')} key="network">
          <NetworkTab src={src} onChange={(src) => this.setState({ src })} locale={locale} />
          {getImageSettingsComponent()}
        </TabPane>
      </Tabs>
    )

    return (
      <div className="lay-editor-tool-wrapper">
        <ToolButton title={locale.format(title)} onClick={showDialog}>
          <Icon type={icon} />
        </ToolButton>
        <Modal
          title={locale.format('toolbar.image.title')}
          bodyStyle={{ padding: 10 }}
          visible={dialogVisible}
          onClose={hideDialog}
          onOk={this.addImageFromState}
          okDisabled={src === ''}
          width={600}
          locale={locale}>
          {overlay}
        </Modal>
      </div>
    )
  }
}
