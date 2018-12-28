import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import Dialog from 'rc-dialog'

const DefaultFooter = (props) => {
  const {
    okText,
    cancelText,
    onOk,
    onCancel,
    okDisabled,
    locale
  } = props
  return (
    <div>
      <button className="lay-editor-button" onClick={onCancel}>{cancelText}</button>
      <button className="lay-editor-button lay-editor-button-primary" disabled={okDisabled} onClick={onOk}>{okText}</button>
    </div>
  )
}

const Modal = (props) => {
  const {
    locale,
    width = 520,
    footer,
    okText = locale.format('text.ok'),
    cancelText = locale.format('text.cancel'),
    onOk,
    onCancel,
    onClose,
    okDisabled,
    ...restProps
  } = props
  const closeIcon = (
    <span className="lay-editor-modal-close-x">
      <Icon type="icon-close" />
    </span>
  )
  const defaultFooter = (
    <DefaultFooter
    okText={okText}
    cancelText={cancelText}
    onOk={onOk}
    onCancel={onCancel || onClose}
    okDisabled={okDisabled}/>
  )
  const myFoooter = footer || defaultFooter
  return (
    <Dialog
      prefixCls="lay-editor-modal"
      transitionName="rc-tooltip-fade"
      width={width}
      closeIcon={closeIcon}
      footer={myFoooter}
      onClose={onClose}
      {...restProps}/>
  )
}

Modal.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  footer: PropTypes.node,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okDisabled: PropTypes.bool
}

export default Modal
