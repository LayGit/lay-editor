import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const {
    config,
    currentState: { textAlignment },
    onChange,
    locale,
  } = props
  return (
    <div className="lay-editor-tool-wrapper">
      {
        config.options.map((alignment, index) => (
          <ToolButton
            key={index}
            value={alignment}
            onClick={onChange}
            active={textAlignment === alignment}
            title={locale.format(config[alignment].title)}>
            <Icon type={config[alignment].icon} />
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
