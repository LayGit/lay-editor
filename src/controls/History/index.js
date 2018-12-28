import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState } from 'draft-js'
import LayoutComponent from './component'

export default class Inline extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
    locale: PropTypes.object,
  }

  state = {
    undoDisabled: false,
    redoDisabled: false,
  }

  componentWillMount() {
    const { editorState } = this.props
    if (editorState) {
      this.setState({
        undoDisabled: editorState.getUndoStack().size === 0,
        redoDisabled: editorState.getRedoStack().size === 0,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      this.setState({
        undoDisabled: nextProps.editorState.getUndoStack().size === 0,
        redoDisabled: nextProps.editorState.getRedoStack().size === 0,
      })
    }
  }

  onChange = (action) => {
    const { editorState, onChange } = this.props
    const newState = EditorState[action](editorState)
    if (newState) {
      onChange(newState)
    }
  }

  render () {
    const { config, locale } = this.props
    const { undoDisabled, redoDisabled } = this.state
    return (
      <LayoutComponent
        config={config}
        currentState={{ undoDisabled, redoDisabled }}
        onChange={this.onChange}
        locale={locale}/>
    )
  }
}
