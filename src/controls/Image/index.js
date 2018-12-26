import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LayoutComponent from './component'

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

  addImage = () => {

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
