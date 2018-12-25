import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getSelectionInlineStyle } from 'draftjs-utils'
import { RichUtils, EditorState, Modifier } from 'draft-js'
import LayoutComponent from './component'
import { forEach } from '../../utils/common'

export default class Inline extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  }

  state = {
    currentStyles: {}
  }

  componentWillMount() {
    const { editorState } = this.props
    if (editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(editorState))
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      this.setState({
        currentStyles: this.changeKeys(getSelectionInlineStyle(nextProps.editorState))
      })
    }
  }

  toggleInlineStyle = (style) => {
    const newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase()
    const { editorState, onChange } = this.props
    let newState = RichUtils.toggleInlineStyle(editorState, newStyle)
    if (style === 'subscript' || style === 'superscript') {
      const removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT'
      const contentState = Modifier.removeInlineStyle(newState.getCurrentContent(), newState.getSelection(), removeStyle)
      newState = EditorState.push(newState, contentState, 'change-inline-style')
    }
    if (newState) {
      onChange(newState)
    }
  }

  changeKeys = (style) => {
    if (style) {
      const st = {};
      forEach(style, (key, value) => {
        st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
      });
      return st;
    }
    return undefined;
  }

  render () {
    const { config } = this.props
    const { currentStyles } = this.state
    return (
      <LayoutComponent
        config={config}
        currentState={currentStyles}
        onChange={this.toggleInlineStyle}/>
    )
  }
}
