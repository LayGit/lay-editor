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

class UploadTab extends Component {

  getMaxSize() {
    console.log(this.props)
    let maxSize = this.props.config.upload.maxSize
    if (!/^\d+(\.\d+)?[m|k]?$/.test(maxSize)) {
      return 0
    }

    if (isNaN(maxSize)) {
      // 处理 m 和 k
      const unit = maxSize[maxSize.length - 1]
      const maxSizeNum = Number(maxSize.substr(0, maxSize.length - 1))
      maxSize = unit == 'm' ? maxSizeNum * 1024 * 1024 : maxSizeNum * 1024
    }

    // 获取文件大小限制
    return maxSize
  }

  // 获取 base64 的上传配置
  getBase64UploadProps() {
    const beforeUpload = (file) => {
      // 大小限制
      const reader = new FileReader()
      let imageUrl64 = reader.readAsDataURL(file)
      reader.onload = () => {
        this.props.onChange(reader.result)
      }
      return false
    }
    return {
      beforeUpload
    }
  }

  // 获取服务端上传配置
  getServerUploadProps() {

  }

  // 获取七牛上传配置
  getQiniuUploadProps() {

  }

  // 获取阿里云上传配置
  getAliyunUploadProps() {

  }

  // 获取又拍云上传配置
  getUpyunUploadProps() {

  }

  getUploadProps = ({ type }) => {
    let uploadProps
    switch (type) {
      case 'server':
        uploadProps = this.getServerUploadProps()
        break
      case 'qiniu':
        uploadProps = this.getQiniuUploadProps()
        break
      case 'aliyun':
        uploadProps = this.getAliyunUploadProps()
        break
      case 'upyun':
        uploadProps = this.getUpyunUploadProps()
        break
      default:
        uploadProps = this.getBase64UploadProps()
    }

    const { beforeUpload, ...restProps } = uploadProps

    // hook beforeUpload
    const maxSize = this.getMaxSize()
    const hookBeforeUpload = (file) => {
      if (maxSize > 0 && file.size > maxSize) {
        return false
      }

      if (beforeUpload) {
        return beforeUpload(file)
      }

      return true
    }

    return {
      beforeUpload: hookBeforeUpload,
      maxSize,
      ...restProps
    }
  }

  render () {
    const {
      config: { accept, upload }
    } = this.props

    return (
      <Upload accept={accept} {...this.getUploadProps(upload)} />
    )
  }
}

const NetworkTab = (props) => {
  const { src, onChange } = props
  const onInputChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className="lay-editor-form">
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">图片地址</div>
        <div className="lay-editor-form-item-control">
          <input className="lay-editor-input" placeholder="http://" value={src} onChange={onInputChange} />
        </div>
      </div>
    </div>
  )
}

const ImageSettings = (props) => {
const { state, updateState, altEnabled } = props
  const { width, height, alt } = state
  return (
    <div className="lay-editor-form">
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">图片宽度</div>
        <div className="lay-editor-form-item-control">
          <input
            className="lay-editor-input"
            placeholder="auto"
            value={width}
            onChange={e => updateState({ width: e.target.value }) } />
        </div>
      </div>
      <div className="lay-editor-form-item">
        <div className="lay-editor-form-item-label">图片高度</div>
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
          <div className="lay-editor-form-item-label">备注</div>
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
    this.state = {
      tabActiveKey: "local",
      src: '',
      alt: '',
      width: defaultSize.width || 'auto',
      height: defaultSize.height || 'auto'
    }
  }

  onTabChange = (key) => {
    this.setState({ tabActiveKey: key, images: [] })
  }

  addImageFromState = () => {
    let { src, height, width, alt } = this.state
    const { onChange } = this.props
    //onChange('http://user.qn.cly888.cn/album/259987403220062208.png', 'auto', 'auto', '')
    if (!isNaN(height)) {
      height += 'px'
    }
    if (!isNaN(width)) {
      width += 'px'
    }
    onChange(src, height, width, alt)
  }

  render () {
    const {
      config: { icon, title, altEnabled },
      dialogVisible,
      showDialog,
      hideDialog,
    } = this.props

    const { tabActiveKey, src } = this.state

    const getImageSettingsComponent = () => {
      return (<ImageSettings altEnabled={altEnabled} state={this.state} updateState={props => this.setState(props)} />)
    }

    const overlay = (
      <Tabs
        style={{ borderRight: 'none' }}
        activeKey={tabActiveKey}
        onChange={this.onTabChange}
        tabBarPosition="left"
        renderTabBar={()=><TabBar />}
        renderTabContent={()=><TabContent animated={false} />}>
        <TabPane tab='本地上传' key="local">
          <UploadTab src={src} onChange={(src) => this.setState({ src })} config={this.props.config} />
          {getImageSettingsComponent()}
        </TabPane>
        <TabPane tab='网络图片' key="network">
          <NetworkTab src={src} onChange={(src) => this.setState({ src })} />
          {getImageSettingsComponent()}
        </TabPane>
      </Tabs>
    )

    return (
      <div className="lay-editor-tool-wrapper">
        <ToolButton title={title} onClick={showDialog}>
          <Icon type={icon} />
        </ToolButton>
        <Modal
          title="插入图片"
          bodyStyle={{ padding: 10 }}
          visible={dialogVisible}
          onClose={hideDialog}
          onOk={this.addImageFromState}>
          {overlay}
        </Modal>
      </div>
    )
  }
}
