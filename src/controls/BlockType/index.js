import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getSelectedBlocksType } from 'draftjs-utils'
import { RichUtils } from 'draft-js'
import LayoutComponent from './component'

export default class BlockType extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  }

  state = {
    currentBlockType: 'unstyled'
  }

  blocksTypes = [
    { label: 'Normal', style: 'unstyled' },
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'Code', style: 'code-block' },
  ]

  componentWillMount() {
    const { editorState } = this.props
    if (editorState) {
      this.setState({ currentBlockType: getSelectedBlocksType(editorState) })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorState && this.props.editorState !== nextProps.editorState) {
      this.setState({ currentBlockType: getSelectedBlocksType(nextProps.editorState) })
    }
  }

  toggleBlockType = (blockType) => {
    const blockTypeValue = this.blocksTypes.find(bt => bt.label === blockType).style
    const { editorState, onChange } = this.props
    const newState = RichUtils.toggleBlockType(editorState, blockTypeValue)
    if (newState) {
      onChange(newState)
    }
  }

  render () {
    const { config } = this.props
    const { currentBlockType } = this.state
    const blockType = this.blocksTypes.find(bt => bt.style === currentBlockType)
    return (
      <LayoutComponent
        config={config}
        currentState={{ blockType: blockType && blockType.label }}
        onChange={this.toggleBlockType}/>
    )
  }
}
