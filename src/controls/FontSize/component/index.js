import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ToolButton from '../../../components/ToolButton'
import Icon from '../../../components/Icon'
import Dropdown from 'rc-dropdown'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'

export default class LayoutComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    locale: PropTypes.object,
  }

  state = {
    defaultFontSize: undefined,
  }

  componentDidMount() {
    const editorElm = document.getElementsByClassName('DraftEditor-root')
    if (editorElm && editorElm.length > 0) {
      const editorStyles = window.getComputedStyle(editorElm[0])
      let defaultFontSize = editorStyles.getPropertyValue('font-size')
      defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2)
      this.setState({
        defaultFontSize,
      })
    }
  }

  onSelect = ({ key }) => {
    this.props.onChange(Number(key))
  }

  getMenu = (options, currentFontSize) => {
    return (
      <Menu
      onSelect={this.onSelect}
      activeKey={this.state.defaultFontSize}
      selectedKeys={[currentFontSize + '']}>
        {
          options.map((size)=>{
            return (
              <MenuItem key={size}>{size}</MenuItem>
            )
          })
        }
      </Menu>
    )
  }

  render () {
    const {
      config: { options, icon, title },
      locale,
    } = this.props
    let { currentState: { fontSize: currentFontSize } } = this.props
    let { defaultFontSize } = this.state
    defaultFontSize = Number(defaultFontSize)
    currentFontSize = currentFontSize || (options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize)
    const menu = this.getMenu(options, currentFontSize)
    return (
      <div className="lay-editor-tool-wrapper">
        <Dropdown
          trigger={['click']}
          overlay={menu}
          animation="slide-up">
          <ToolButton title={locale.format(title)}>
            <Icon type={icon} />
          </ToolButton>
        </Dropdown>
      </div>
    )
  }
}
