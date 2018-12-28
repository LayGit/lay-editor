import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const {
    config,
    currentState,
    onChange,
    locale
  } = props

  const getDisabled = (howdo) => {
    if (howdo === 'undo') {
      return currentState.undoDisabled
    } else if (howdo === 'redo') {
      return currentState.redoDisabled
    }
    return false
  }

  return (
    <div className="lay-editor-tool-wrapper">
      {
        config.options.map((howdo, index) => (
          <ToolButton
            key={index}
            value={howdo}
            onClick={onChange}
            disabled={getDisabled(howdo)}
            title={locale.format(config[howdo].title)}>
            <Icon type={config[howdo].icon} />
          </ToolButton>
        ))
      }
    </div>
  )
}

LayoutComponent.propTypes = {
  config: PropTypes.object,
  onChange: PropTypes.func,
  currentState: PropTypes.object,
  locale: PropTypes.object,
}

export default LayoutComponent
