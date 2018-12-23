import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRow,
  convertFromRaw,
  CompositeDecorator
} from 'draft-js'

import {
  changeDepth,
  handleNewLine,
  blockRenderMap,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType
} from "draftjs-utils"

class LayEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  render () {
    const { editorState } = this.state
    return (
      <div>
        <Editor
          editorState={editorState}/>
      </div>
    )
  }
}

export default LayEditor
