import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RichUtils, EditorState, Modifier } from 'draft-js'
import {
  getSelectionText,
  getEntityRange,
  getSelectionEntity
} from 'draftjs-utils'
import LayoutComponent from './component'
import linkifyIt from 'linkify-it'

const linkify = linkifyIt()

class Link extends Component {
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
    locale: PropTypes.object,
  }

  state = {
    link: undefined,
    selectionText: undefined,
  }

  componentWillMount() {
    const { editorState } = this.props
    if (editorState) {
      this.setState({
        currentEntity: getSelectionEntity(editorState)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = {}
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      newState.currentEntity = getSelectionEntity(nextProps.editorState)
    }
    this.setState(newState)
  }

  onChange = (action, title, target, targetOption) => {
    if (action === 'link') {
      const links = linkify.match(target)
      const linkifiedTarget = links && links[0] ? links[0].url : ''
      this.addLink(title, linkifiedTarget, targetOption)
    } else {
      this.removeLink()
    }
  }

  addLink(linkTitle, linkTarget, linkTargetOption) {
    const { editorState, onChange } = this.props;
    const { currentEntity } = this.state;
    let selection = editorState.getSelection()

    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity);
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      })
    }
    const entityKey = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', { url: linkTarget, targetOption: linkTargetOption })
      .getLastCreatedEntityKey()

    let contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      `${linkTitle}`,
      editorState.getCurrentInlineStyle(),
      entityKey,
    )
    let newEditorState = EditorState.push(editorState, contentState, 'insert-characters')

    // insert a blank space after link
    selection = newEditorState.getSelection().merge({
      anchorOffset: selection.get('anchorOffset') + linkTitle.length,
      focusOffset: selection.get('anchorOffset') + linkTitle.length,
    })
    newEditorState = EditorState.acceptSelection(newEditorState, selection)
    contentState = Modifier.insertText(
      newEditorState.getCurrentContent(),
      selection,
      ' ',
      newEditorState.getCurrentInlineStyle(),
      undefined,
    )
    onChange(EditorState.push(newEditorState, contentState, 'insert-characters'))
  }

  removeLink() {
    const { editorState, onChange } = this.props
    const { currentEntity } = this.state
    let selection = editorState.getSelection()
    if (currentEntity) {
      const entityRange = getEntityRange(editorState, currentEntity)
      selection = selection.merge({
        anchorOffset: entityRange.start,
        focusOffset: entityRange.end,
      })
      onChange(RichUtils.toggleLink(editorState, selection, null))
    }
  }

  getCurrentValues = () => {
    const { editorState } = this.props
    const { currentEntity } = this.state
    const contentState = editorState.getCurrentContent()
    const currentValues = {}
    if (currentEntity && (contentState.getEntity(currentEntity).get('type') === 'LINK')) {
      currentValues.link = {}
      const entityRange = currentEntity && getEntityRange(editorState, currentEntity)
      currentValues.link.target = currentEntity && contentState.getEntity(currentEntity).get('data').url
      currentValues.link.targetOption = currentEntity && contentState.getEntity(currentEntity).get('data').targetOption
      currentValues.link.title = (entityRange && entityRange.text)
    }
    currentValues.selectionText = getSelectionText(editorState)
    return currentValues
  }

  render () {
    const { config, locale } = this.props
    const { link, selectionText } = this.getCurrentValues()
    return (
      <LayoutComponent
        config={config}
        locale={locale}
        currentState={{
          link,
          selectionText,
        }}
        onChange={this.onChange} />
    )
  }
}

export default Link
