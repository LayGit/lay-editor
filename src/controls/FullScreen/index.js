import React from 'react'
import PropTypes from 'prop-types'
import LayoutComponent from './component'

const FullScreen = (props) => {
  const {
    config,
    toggleFullScreen,
    locale,
    fullScreen,
  } = props

  return (
    <LayoutComponent
      config={config}
      toggleFullScreen={toggleFullScreen}
      fullScreen={fullScreen}
      locale={locale}/>
    )
}

FullScreen.propTypes = {
  toggleFullScreen: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool,
  config: PropTypes.object,
  locale: PropTypes.object,
}

export default FullScreen
