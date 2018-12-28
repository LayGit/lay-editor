import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { EditorState, Modifier } from 'draft-js'
import { getSelectionCustomInlineStyle } from 'draftjs-utils'
import LayoutComponent from './component'
import { forEach } from '../../utils/common'

const Remove = (props) => {
  const removeInlineStyles = () => {
    const { editorState, onChange } = props
    onChange(removeAllInlineStyles(editorState))
  }

  const removeAllInlineStyles = (editorState) => {
    let contentState = editorState.getCurrentContent();
    [
      'BOLD',
      'ITALIC',
      'UNDERLINE',
      'STRIKETHROUGH',
      'MONOSPACE',
      'SUPERSCRIPT',
      'SUBSCRIPT',
    ].forEach((style) => {
      contentState = Modifier.removeInlineStyle(
        contentState,
        editorState.getSelection(),
        style,
      );
    });
    const customStyles = getSelectionCustomInlineStyle(editorState, ['FONTSIZE', 'FONTFAMILY', 'COLOR', 'BGCOLOR']);
    forEach(customStyles, (key, value) => {
      if (value) {
        contentState = Modifier.removeInlineStyle(
          contentState,
          editorState.getSelection(),
          value,
        );
      }
    });

    return EditorState.push(editorState, contentState, 'change-inline-style');
  }

  return (
    <LayoutComponent
      config={props.config}
      onChange={removeInlineStyles}
      locale={props.locale}/>
  )
}

Remove.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  config: PropTypes.object,
  locale: PropTypes.object,
}

export default Remove
