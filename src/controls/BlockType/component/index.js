import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const {
    config,
    currentState: { blockType },
    onChange,
    locale
  } = props

  return (
    <div className="lay-editor-tool-wrapper">
      {
        config.options.map((block, index) => (
          <ToolButton
            key={index}
            value={block}
            onClick={onChange}
            active={blockType === block}
            title={locale.format(config[block].title)}>
            <Icon type={config[block].icon} />
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
