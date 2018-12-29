import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const {
    toggleFullScreen,
    fullScreen,
    config,
    locale,
  } = props

  const sw = fullScreen ? 'off' : 'on'

  return (
    <div className="lay-editor-tool-wrapper">
      <ToolButton
        onClick={toggleFullScreen}
        title={locale.format(config[sw].title)}>
        <Icon type={config[sw].icon} />
      </ToolButton>
    </div>
  )
}

LayoutComponent.propTypes = {
  toggleFullScreen: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
  config: PropTypes.object,
  locale: PropTypes.object,
}

export default LayoutComponent
