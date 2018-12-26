import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tooltip from 'rc-tooltip'

const ToolButton = (props) => {
  const { children, active, disabled, title, onClick, value } = props
  const content = (
    <div className={classNames(
      'lay-editor-tool-btn',
      {
        'lay-editor-tool-btn-active': active,
        'lay-editor-tool-btn-disabled': disabled,
      },
    )}
    onClick={() => !disabled && onClick && onClick(value) }>
      {children}
    </div>
  )

  return title === null ? content : (
    <Tooltip
      placement="bottom"
      trigger={['hover']}
      overlay={<span>{title}</span>}
      mouseEnterDelay={0}
      mouseLeaveDelay={0.1}
      transitionName="rc-tooltip-fade">
      {content}
    </Tooltip>
  )
}

ToolButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  value: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  title: PropTypes.string,
}

export default ToolButton
