import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils'
import LayoutComponent from './Component'

export default class Inline extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
    locale: PropTypes.object,
  }

  state = {
    currentTextAlignment: undefined
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(nextProps.editorState).get('text-align')
      })
    }
  }

  addBlockAlignmentData = (value) => {
    const { editorState, onChange } = this.props
    const { currentTextAlignment } = this.state
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }))
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }))
    }
  }

  render () {
    const { config, locale } = this.props
    const { currentTextAlignment } = this.state
    return (
      <LayoutComponent
        config={config}
        currentState={{ textAlignment: currentTextAlignment }}
        onChange={this.addBlockAlignmentData}
        locale={locale}/>
    )
  }
}
