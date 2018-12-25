import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils'

import LayoutComponent from './component'

export default class FontSize extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object,
    config: PropTypes.object,
  }

  state = {
    currentFontSize: undefined,
  }

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentFontSize:
          getSelectionCustomInlineStyle(editorState, ['FONTSIZE']).FONTSIZE,
      })
    }
  }

  componentWillReceiveProps(nextProps): void {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      this.setState({ currentFontSize: getSelectionCustomInlineStyle(nextProps.editorState, ['FONTSIZE']).FONTSIZE })
    }
  }

  toggleFontSize = (fontSize) => {
    const { editorState, onChange } = this.props
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontSize',
      fontSize,
    )
    if (newState) {
      onChange(newState)
    }
  }

  render() {
    const { config, translations } = this.props
    const { currentFontSize } = this.state
    const fontSize = currentFontSize && Number(currentFontSize.substring(9))
    return (
      <LayoutComponent
        config={config}
        currentState={{ fontSize }}
        onChange={this.toggleFontSize}
      />
    )
  }
}
