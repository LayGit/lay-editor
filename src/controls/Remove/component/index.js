import React from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'

const LayoutComponent = ({ config, onChange }) => {
  const { icon, title } = config
  return (
    <div className="lay-editor-tool-wrapper">
      <ToolButton
        onClick={onChange}
        title={title}>
        <Icon type={icon} />
      </ToolButton>
    </div>
  );
};

LayoutComponent.propTypes = {
  onChange: PropTypes.func,
  config: PropTypes.object,
};

export default LayoutComponent
