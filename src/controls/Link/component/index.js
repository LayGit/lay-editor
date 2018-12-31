import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'
import Modal from '../../../components/Modal'

class LayoutComponent extends Component {
  state = {
    modalVisible: false,
    linkTitle: '',
    linkTarget: '',
    linkTargetOption: '_self'
  }

  showModal = () => {
    const { currentState: { link, selectionText } } = this.props
    const { linkTargetOption } = this.state
    this.setState({
      modalVisible: true,
      linkTarget: (link && link.target) || '',
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    })
  }

  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  removeLink = () => {
    this.props.onChange('unlink')
  }

  addLink = () => {
    const { onChange } = this.props
    const { linkTitle, linkTarget, linkTargetOption } = this.state
    onChange('link', linkTitle, linkTarget, linkTargetOption)
    this.setState({ modalVisible: false })
  }

  onInputChange = (e) => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    })
  }

  updateTargetOption = (e) => {
    this.setState({
      linkTargetOption: e.target.checked ? '_blank' : '_self',
    })
  }

  render () {
    const {
      config: { options, link, unlink },
      currentState,
      locale,
    } = this.props
    const { modalVisible, linkTitle, linkTarget, linkTargetOption } = this.state
    return (
      <div className="lay-editor-tool-wrapper">
        {options.indexOf('link') > -1 && (
          <ToolButton
            onClick={this.showModal}
            title={locale.format(link.title)}>
            <Icon type={link.icon} />
          </ToolButton>
        )}
        {options.indexOf('unlink') > -1 && (
          <ToolButton
            disabled={!currentState.link}
            onClick={this.removeLink}
            title={locale.format(unlink.title)}>
            <Icon type={unlink.icon} />
          </ToolButton>
        )}
        <Modal
          title={locale.format(link.title)}
          bodyStyle={{ padding: 10 }}
          visible={modalVisible}
          onClose={this.hideModal}
          onOk={this.addLink}
          okDisabled={linkTitle === '' || linkTarget === ''}
          width={400}
          locale={locale}>
          <div className="lay-editor-form">
            <div className="lay-editor-form-item">
              <div className="lay-editor-form-item-label">{locale.format('toolbar.link.form.label.title')}</div>
              <div className="lay-editor-form-item-control">
                <input name="linkTitle" className="lay-editor-input" value={linkTitle} onChange={this.onInputChange} />
              </div>
            </div>
            <div className="lay-editor-form-item">
              <div className="lay-editor-form-item-label">{locale.format('toolbar.link.form.label.target')}</div>
              <div className="lay-editor-form-item-control">
                <input name="linkTarget" className="lay-editor-input" value={linkTarget} onChange={this.onInputChange} />
              </div>
            </div>
            <div className="lay-editor-form-item">
              <div className="lay-editor-form-item-control">
                <label htmlFor="openLinkInNewWindow">
                  <input
                    id="openLinkInNewWindow"
                    type="checkbox"
                    checked={linkTargetOption === '_blank'}
                    value="_blank"
                    onChange={this.updateTargetOption} />
                  <span>&nbsp;{locale.format('toolbar.link.form.label.blank')}</span>
                </label>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default LayoutComponent
