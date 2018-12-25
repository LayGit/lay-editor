import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const { config, currentState, onChange } = props
  return (
    <div className="lay-editor-inline-wrapper">
      {
        config.options.map((style, index) => (
          <ToolButton
            key={index}
            value={style}
            onClick={onChange}
            active={currentState[style] === true || (style === 'MONOSPACE' && currentState.CODE)}
            title={config[style].title}>
            <Icon type={config[style].icon} />
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
}

export default LayoutComponent
