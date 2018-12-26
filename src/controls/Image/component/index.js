import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'
import Dialog from 'rc-dialog'
import Tabs, { TabPane } from 'rc-tabs'
import TabBar from 'rc-tabs/lib/TabBar'
import TabContent from 'rc-tabs/lib/TabContent'
import Upload from 'rc-upload'

class UploadTab extends Component {

  state = {
    fileList: [],
    dragState: 'drop'
  }

  onFileDrop = (e) => {
    this.setState({ dragState: e.type })
  }

  saveUpload = (node) => {
    this.upload = node
  }

  render () {
    const {
      config: { inputAccept },
    } = this.props

    const dragCls = classNames('lay-editor-upload-drag', {
      'lay-editor-upload-drag-hover': this.state.dragState === 'dragover'
    })

    return (
      <span className="lay-editor-upload">
        <div
          className={dragCls}
          onDrop={this.onFileDrop}
          onDragOver={this.onFileDrop}
          onDragLeave={this.onFileDrop}>
          <Upload
            ref={this.saveUpload}
            className="lay-editor-upload-btn">
            <div className="lay-editor-upload-drag-container">
              <p className="lay-editor-upload-drag-icon">
                <Icon type="icon-inbox" />
              </p>
              <p className="lay-editor-upload-text">点击或拖放文件到此处上传</p>
              <p className="lay-editor-upload-hint">支持选择多文件上传</p>
            </div>
          </Upload>
        </div>
      </span>
    )
  }
}

class NetworkTab extends Component {
  render () {
    return (
      <div></div>
    )
  }
}

export default class LayoutComponent extends Component {
  state = {
    tabActiveKey: "local"
  }

  onTabChange = (key) => {
    this.setState({ tabActiveKey: key })
  }

  render () {
    const {
      config: { icon, title, inputAccept },
      dialogVisible,
      showDialog,
      hideDialog,
    } = this.props

    const { tabActiveKey } = this.state

    const overlay = (
      <Tabs
        style={{ borderRight: 'none' }}
        activeKey={tabActiveKey}
        onChange={this.onTabChange}
        tabBarPosition="left"
        renderTabBar={()=><TabBar />}
        renderTabContent={()=><TabContent animated={false} />}>
        <TabPane tab='本地上传' key="local">
          <UploadTab config={this.props.config} />
        </TabPane>
        <TabPane tab='网络图片' key="network">
          <NetworkTab />
        </TabPane>
      </Tabs>
    )

    return (
      <div className="lay-editor-inline-wrapper">
        <ToolButton title={title} onClick={showDialog}>
          <Icon type={icon} />
        </ToolButton>
        <Dialog
          title="插入图片"
          transitionName="rc-tooltip-fade"
          visible={dialogVisible}
          onClose={hideDialog}>
          {overlay}
        </Dialog>
      </div>
    )
  }
}
