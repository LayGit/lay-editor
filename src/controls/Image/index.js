import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LayoutComponent from './component'
import { AtomicBlockUtils } from 'draft-js'

export default class Image extends Component {
  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
  }

  state = {
    dialogVisible: false
  }

  showDialog = () => {
    this.setState({ dialogVisible: true })
  }

  hideDialog = () => {
    this.setState({ dialogVisible: false })
  }

  addImage = (src, height, width, alt) => {
    const { editorState, onChange, config } = this.props
    const entityData = { src, height, width }
    if (config.altEnabled) {
      entityData.alt = alt
    }

    const entityKey = editorState.getCurrentContent().createEntity('IMAGE', 'MUTABLE', entityData).getLastCreatedEntityKey()
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ')
    onChange(newEditorState)
    this.hideDialog()
  }

  render () {
    const { config } = this.props
    const { dialogVisible } = this.state
    return (
      <LayoutComponent
        config={config}
        onChange={this.addImage}
        dialogVisible={dialogVisible}
        showDialog={this.showDialog}
        hideDialog={this.hideDialog}/>
    )
  }
}
