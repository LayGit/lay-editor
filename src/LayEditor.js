import React, { Component } from 'react'
import PropTypes from "prop-types"
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  CompositeDecorator
} from 'draft-js'
import {
  changeDepth,
  handleNewLine,
  blockRenderMap,
  getCustomStyleMap,
  extractInlineStyle,
  getSelectedBlocksType,
} from 'draftjs-utils'
import classNames from 'classnames'
import Icon from './components/Icon'
import defaultToolbar from './config/defaultToolbar'
import { mergeRecursive } from './utils/toolbar'
import { handlePastedText } from "./utils/handlePaste"
import Controls from "./controls"
import { hasProperty } from './utils/common'
import FocusHandler from './events/focus'
import KeyDownHandler from "./events/keydown"
import SuggestionHandler from './events/suggestions'
import ModalHandler from './events/modals'
import getBlockRenderFunc from './renderer'
import locales from './locales'

const getLocale = (locale) => {
  let newLocale
  if (!locale) {
    newLocale = locales['en-US']
  } else if (typeof locale === 'string') {
    newLocale = locale && (locale in locales) ? locales[locale] : locales['en-US']
  } else {
    newLocale = locale
  }
  newLocale.format = function (val) {
    const self = this
    if (self[val]) {
      return self[val]
    }
    return val
  }

  return newLocale
}

class LayEditor extends Component {
  static propTypes = {
    // 编辑器引用
    editorRef: PropTypes.func,
    toolbar: PropTypes.object,
    toolbarHidden: PropTypes.bool,
    toolbarToggleEnable: PropTypes.bool,
    value: PropTypes.object,
    defaultValue: PropTypes.object,
    content: PropTypes.object,
    defaultContent: PropTypes.object,
    onChange: PropTypes.func,
    onContentChange: PropTypes.func,
    editorClassName: PropTypes.string,
    editorStyle: PropTypes.object,
    wrapperClassName: PropTypes.string,
    wrapperStyle: PropTypes.object,
    toolbarClassName: PropTypes.string,
    toolbarStyle: PropTypes.object,
    readOnly: PropTypes.bool,
    mention: PropTypes.object,
    hashtag: PropTypes.object,
    placeholder: PropTypes.string,
    locale: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }

  constructor(props) {
    super(props)
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar)
    const locale = getLocale(props.locale)
    this.state = {
      editorState: undefined,
      editorFocused: false,
      toolbar,
      locale,
    }
    const wrapperId = props.wrapperId ? props.wrapperId : Math.floor(Math.random() * 10000)
    this.wrapperId = `lay-editor-${wrapperId}`
    this.modalHandler = new ModalHandler()
    this.focusHandler = new FocusHandler()
    this.blockRendererFn = getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
        locale: locale
      },
      props.customBlockRenderFunc
    )
    this.customStyleMap = getCustomStyleMap()
  }

  componentWillMount() {
    this.compositeDecorator = this.getCompositeDecorator()
    const editorState = this.createEditorState(this.compositeDecorator)
    extractInlineStyle(editorState)
    this.setState({ editorState })
  }

  componentDidMount() {
    this.modalHandler.init(this.wrapperId)
  }

  componentWillReceiveProps(nextProps) {
    const newState = {}
    // 判断 toolbar 是否改变
    if (this.props.toolbar !== nextProps.toolbar) {
      const toolbar = mergeRecursive(defaultToolbar, nextProps.toolbar)
      newState.toolbar = toolbar
    }

    // 判断 locale 是否改变
    if (nextProps.locale !== this.props.locale) {
      newState.locale = getLocale(nextProps.locale)
    }

    // editorState 改变
    if (hasProperty(nextProps, 'value') && this.props.value !== nextProps.value) {
      if (nextProps.value) {
        newState.editorState = EditorState.set(nextProps.value, {
          decorator: this.compositeDecorator
        })
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator)
      }
    } else if (hasProperty(nextProps, 'content') && this.props.content !== nextProps.content) {
      if (nextProps.content) {
        const newEditorState = this.changeEditorState(nextProps.content)
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }

    if (nextProps.value !== this.props.value || nextProps.content !== this.props.content) {
      extractInlineStyle(newState.editorState)
    }
    this.setState(newState)
    this.customStyleMap = getCustomStyleMap()
  }

  // 是否只读
  isReadOnly = () => this.props.readOnly

  // 是否允许图片对齐
  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled

  // 获取编辑器状态
  getEditorState = () => this.state.editorState

  getSuggestions = () => this.props.metion && this.props.mention.suggestions

  getCompositeDecorator = () => {
    // const decorators = [
    //   ...this.props.customDecorators,
    //   getLinkDecorator({
    //     showOpenOptionOnHover: this.state.toolbar.link.showOpenOptionOnHover
    //   })
    // ]
    // if (this.props.mention) {
    //   decorators.push(
    //     ...getMentionDecorators({
    //       ...this.props.mention,
    //       onChange: this.onChange,
    //       getEditorState: this.getEditorState,
    //       getSuggestions: this.getSuggestions,
    //       getWrapperRef: this.getWrapperRef,
    //       modalHandler: this.modalHandler
    //     })
    //   )
    // }
    // if (this.props.hashtag) {
    //   decorators.push(getHashtagDecorator(this.props.hashtag))
    // }
    const decorators = []
    return new CompositeDecorator(decorators)
  }

  createEditorState = (compositeDecorator) => {
    let editorState
    if (hasProperty(this.props, "value")) {
      if (this.props.value) {
        editorState = EditorState.set(this.props.value, {
          decorator: compositeDecorator
        })
      }
    } else if (hasProperty(this.props, "defaultValue")) {
      if (this.props.defaultValue) {
        editorState = EditorState.set(this.props.defaultValue, {
          decorator: compositeDecorator
        })
      }
    } else if (hasProperty(this.props, "content")) {
      if (this.props.content) {
        const content = convertFromRaw(this.props.content);
        editorState = EditorState.createWithContent(
          content,
          compositeDecorator
        )
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(this.props, "defaultContent")) {
      let content = this.props.defaultContent
      if (content) {
        content = convertFromRaw(content)
        editorState = EditorState.createWithContent(
          content,
          compositeDecorator
        )
        editorState = EditorState.moveSelectionToEnd(editorState)
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator)
    }
    return editorState
  }

  onChange = (editorState) => {
    const { onChange, readOnly } = this.props
    if (!readOnly && !(getSelectedBlocksType(editorState) === 'atomic' && editorState.getSelection().isCollapsed)) {
      if (onChange) {
        onChange(editorState, this.props.wrapperId)
      }

      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState })
        this.afterChange(editorState)
      } else {
        this.afterChange(editorState)
      }
    }
    this.setState({ editorState })
  }

  afterChange = (editorState) => {
    setTimeout(() => {
      const { onContentChange } = this.props
      if (onContentChange) {
        onContentChange(convertToRaw(editorState.getCurrentContent()))
      }
    })
  }

  setWrapperReference = (ref) => {
    this.wrapper = ref
  }

  setEditorReference = (ref) => {
    if (this.props.editorRef) {
      this.props.editorRef(ref)
    }
    this.editor = ref
  }

  onToolbarFocus = (e) => {
    const { onFocus } = this.props
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(e)
    }
  }

  focusEditor = () => {
    setTimeout(() => {
      this.editor.focus()
    })
  }

  onEditorFocus = (e) => {
    const { onFocus } = this.props
    this.setState({ editorFocused: true })
    const editorFocused = this.focusHandler.isEditorFocused()
    if (onFocus && editorFocused) {
      onFocus(e)
    }
  }

  onEditorBlur = () => {
    this.setState({ editorFocused: false })
  }

  onEditorMouseDown = () => {
    this.focusHandler.onEditorMouseDown()
  }

  onTab = (e) => {
    const editorState = changeDepth(this.state.editorState, e.shiftKey ? -1 : 1, 4)
    if (editorState && editorState !== this.state.editorState) {
      this.onChange(editorState)
      e.preventDefault()
    }
  }

  handlePastedText = (text, html) => {
    const { editorState } = this.state
    return handlePastedText(text, html, editorState, this.onChange)
  }

  preventDefault = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
      this.focusHandler.onInputMouseDown()
    } else {
      e.preventDefault()
    }
  }

  onUpDownArrow = (e) => {
    if (SuggestionHandler.isOpen()) {
      e.preventDefault()
    }
  }

  handleReturn = (e) => {
    if (SuggestionHandler.isOpen()) {
      return true
    }

    const editorState = handleNewLine(this.state.editorState, e)
    if (editorState) {
      this.onChange(editorState)
      return true
    }
    return false
  }

  blockStyleFn = (block) => {
    const blockAlignment = block.getData() && block.getData().get('text-align');
    if (blockAlignment) {
      return `lay-editor-${blockAlignment}-aligned-block`;
    }
    return '';
  }

  getCustomStyleMap = () => {
    const map = getCustomStyleMap()
    map['CODE'] = {
      padding: '2px 4px',
      fontSize: '90%',
      color: '#c7254e',
      backgroundColor: '#f8f8f8',
      borderRadius: '4px'
    }
    map['BOLD'] = {
      fontWeight: 700
    }
    return map
  }

  render () {
    const { editorState, editorFocused, toolbar, locale } = this.state
    const {
      toolbarHidden,
      toolbarToggleEnable,
      wrapperClassName,
      wrapperStyle,
      toolbarClassName,
      toolbarStyle,
      editorClassName,
      editorStyle,
      placeholder,
    } = this.props
    const controlProps = {
      editorState,
      onChange: this.onChange,
    }
    // toolbarToggleEnable = true 才会进行切换
    const toolbarVisible = toolbarToggleEnable ? (editorFocused || this.focusHandler.isInputFocused()) : true

    return (
      <div
        id={this.wrapperId}
        className={classNames(wrapperClassName, 'lay-editor-wrapper')}
        style={wrapperStyle}>
        {toolbarVisible && (
          <div
            className={classNames(toolbarClassName, 'lay-editor-toolbar-wrapper')}
            style={{
              visibility: toolbarVisible ? 'visible' : 'hidden',
              ...toolbarStyle
            }}
            onMouseDown={this.preventDefault}
            onFocus={this.onToolbarFocus}>
            {
              toolbar.options.map((opt, index) => {
                const Control = Controls[opt]
                const config = toolbar[opt]
                return (
                  <Control key={index} locale={locale} {...controlProps} config={config} />
                )
              })
            }
          </div>
        )}
        <div
          ref={this.setWrapperReference}
          className={classNames(editorClassName, 'lay-editor-content-wrapper')}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}>
          <Editor
            ref={this.setEditorReference}
            onTab={this.onTab}
            onUpArrow={this.onUpDownArrow}
            onDownArrow={this.onUpDownArrow}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={this.blockStyleFn}
            customStyleMap={this.getCustomStyleMap()}
            handleReturn={this.handleReturn}
            handlePastedText={this.handlePastedText}
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={blockRenderMap}
            placeholder={placeholder} />
        </div>
      </div>
    )
  }
}

export default LayEditor
