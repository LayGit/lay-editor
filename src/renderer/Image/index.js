import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import classNames from 'classnames'

const getImageComponent = config => class Image extends Component {
  state = {
    hovered: false
  }

  getAlignmentPanel = (alignment) => {
    return (
      <div className={classNames('lay-editor-alignment-popup')}>
        <span
          onClick={this.setEntityAlignmentLeft}
          className={alignment === 'left' ? 'lay-editor-alignment-popup-active' : null}>靠左</span>
        <span
          onClick={this.setEntityAlignmentCenter}
          className={alignment === 'center' ? 'lay-editor-alignment-popup-active' : null}>居中</span>
        <span
          onClick={this.setEntityAlignmentRight}
          className={alignment === 'right' ? 'lay-editor-alignment-popup-active' : null}>靠右</span>
      </div>
    )
  }

  setEntityAlignmentLeft = () => {
    this.setEntityAlignment('left')
  }

  setEntityAlignmentCenter = () => {
    this.setEntityAlignment('center')
  }

  setEntityAlignmentRight = () => {
    this.setEntityAlignment('right')
  }

  setEntityAlignment = (alignment) => {
    const { block, contentState } = this.props
    const entityKey = block.getEntityAt(0)
    contentState.mergeEntityData(entityKey, { alignment })
    config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'))
    // 无意义 只是为了触发 render
    this.setState({ refresh: true })
  }

  toggleHovered = () => {
    const hovered = !this.state.hovered
    this.setState({ hovered })
  }

  render () {
    const { block, contentState } = this.props
    const { hovered } = this.state
    const { isReadOnly, isImageAlignmentEnabled } = config
    const entity = contentState.getEntity(block.getEntityAt(0))
    const { src, alignment = 'left', height, width, alt } = entity.getData()

    // 设置对齐方式的弹窗
    const alignmentPanel = !isReadOnly() && hovered && isImageAlignmentEnabled() ? this.getAlignmentPanel(alignment) : null
    return (
      <span
        className={classNames('lay-editor-image-alignment', `lay-editor-image-${alignment}`)}>
        <span
          onMouseEnter={this.toggleHovered}
          onMouseLeave={this.toggleHovered}
          className="lay-editor-image-wrapper">
          <img
            src={src}
            alt={alt}
            style={{ width, height }} />
          {alignmentPanel}
        </span>
      </span>
    )
  }
}

export default getImageComponent
