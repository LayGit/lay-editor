import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RichUtils } from 'draft-js'
import LayoutComponent from './component'
import {
  changeDepth,
  getBlockBeforeSelectedBlock,
  getSelectedBlock,
  isListBlock
} from 'draftjs-utils'

class List extends Component {
  state = {
    currentBlock: undefined
  }

  componentWillMount() {
    const { editorState } = this.props
    if (editorState) {
      this.setState({ currentBlock: getSelectedBlock(editorState) })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      const currentBlock = getSelectedBlock(nextProps.editorState)
      this.setState({ currentBlock: getSelectedBlock(nextProps.editorState) })
    }
  }

  toggleBlockType = (blockType) => {
    const { onChange, editorState } = this.props
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType,
    )
    if (newState) {
      onChange(newState)
    }
  }

  onChange = (value) => {
    if (value === 'unordered') {
      this.toggleBlockType('unordered-list-item')
    } else if (value === 'ordered') {
      this.toggleBlockType('ordered-list-item')
    } else if (value === 'indent') {
      this.adjustDepth(1)
    } else {
      this.adjustDepth(-1)
    }
  }

  adjustDepth = (adjustment) => {
    const { onChange, editorState } = this.props
    const newState = changeDepth(
      editorState,
      adjustment,
      4,
    )
    if (newState) {
      onChange(newState)
    }
  }

  isIndentDisabled = () => {
    const { editorState } = this.props
    const { currentBlock } = this.state
    const previousBlock = getBlockBeforeSelectedBlock(editorState)
    
    if (!previousBlock || !isListBlock(currentBlock) ||
      (previousBlock.get('type') !== currentBlock.get('type')) ||
      (previousBlock.get('depth') < currentBlock.get('depth'))
    ) {
      return true
    }
    return false
  }

  isOutdentDisabled = () => {
    const { currentBlock } = this.state
    return !currentBlock || !isListBlock(currentBlock) || currentBlock.get('depth') <= 0
  }

  render () {
    const { config } = this.props
    const { currentBlock } = this.state
    let listType
    if (currentBlock.get('type') === 'unordered-list-item') {
      listType = 'unordered'
    } else if (currentBlock.get('type') === 'ordered-list-item') {
      listType = 'ordered'
    }
    const indentDisabled = this.isIndentDisabled()
    const outdentDisabled = this.isOutdentDisabled()
    return (
      <LayoutComponent
        config={config}
        currentState={{ listType }}
        onChange={this.onChange}
        indentDisabled={indentDisabled}
        outdentDisabled={outdentDisabled}/>
    )
  }
}

List.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  config: PropTypes.object,
}

export default List
