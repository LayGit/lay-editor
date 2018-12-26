import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = (props) => {
  const {
    config,
    currentState: { listType },
    indentDisabled,
    outdentDisabled,
    onChange
  } = props
  const options = config.options

  const toggleBlockType = (blockType) => {
    onChange(blockType)
  }

  const indent = () => {
    onChange('indent')
  }

  const outdent = () => {
    onChange('outdent')
  }

  const getActive = (style, listType) => {
    return style === 'ordered' && style === 'unordered' && style === listType
  }

  const getDisabled = (style) => {
    if (style === 'indent') {
      return indentDisabled
    } else if (style === 'outdent') {
      return outdentDisabled
    }
    return false
  }

  const clickHanders = {
    unordered: toggleBlockType,
    ordered: toggleBlockType,
    indent: indent,
    outdent: outdent
  }

  return (
    <div className="lay-editor-tool-wrapper">
      {
        options.map((style, index) => (
          <ToolButton
            key={index}
            value={style}
            onClick={toggleBlockType}
            active={getActive(style, listType)}
            disabled={getDisabled(style)}
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
  indentDisabled: PropTypes.bool,
  outdentDisabled: PropTypes.bool,
}

export default LayoutComponent
