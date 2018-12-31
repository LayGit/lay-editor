import React, { Component } from 'react'
import { EditorState } from 'draft-js'
import classNames from 'classnames'

const getImageComponent = config => class Image extends Component {
  state = {
    hovered: false
  }

  getAlignmentPanel = (alignment) => {
    const { locale } = config
    return (
      <div className={classNames('lay-editor-alignment-popup', {
          'lay-editor-alignment-popup-right': alignment === 'right'
        })}>
        <span
          onClick={this.setEntityAlignmentLeft}
          className={alignment === 'left' ? 'lay-editor-alignment-popup-active' : null}>{locale.format('image.align.left')}</span>
        <span
          onClick={this.setEntityAlignmentCenter}
          className={alignment === 'center' ? 'lay-editor-alignment-popup-active' : null}>{locale.format('image.align.center')}</span>
        <span
          onClick={this.setEntityAlignmentRight}
          className={alignment === 'right' ? 'lay-editor-alignment-popup-active' : null}>{locale.format('image.align.right')}</span>
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
    // only for rerender
    this.setState({ refresh: true })
  }

  toggleHovered = (hovered) => {
    this.setState({ hovered })
  }

  render () {
    const { block, contentState } = this.props
    const { hovered } = this.state
    const { isReadOnly, isImageAlignmentEnabled } = config
    const entity = contentState.getEntity(block.getEntityAt(0))
    const { src, alignment = 'left', height, width, alt } = entity.getData()

    // alignment panel
    const alignmentPanel = !isReadOnly() && hovered && isImageAlignmentEnabled() ? this.getAlignmentPanel(alignment) : null
    return (
      <span
        className={classNames('lay-editor-image-alignment', `lay-editor-image-${alignment}`)}>
        <span
          onMouseEnter={this.toggleHovered.bind(this, true)}
          onMouseLeave={this.toggleHovered.bind(this, false)}
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
