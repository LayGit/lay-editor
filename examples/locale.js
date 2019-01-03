import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LayEditor } from '../src/index'
import '../assets/index.less'

class Test extends Component {
  state = {
    // EditorState
    value: undefined,
    locale: 'en-US',
  }

  onChangeLocale(locale) {
    this.setState({ locale })
  }

  onChange = (value) => {
    this.setState({ value })
  }

  render () {
    const { value, locale } = this.state

    const placeholder = {
      'zh-CN': '写点什么吧...',
      'en-US': 'write something...'
    }

    return (
      <div style={{ padding: 20 }}>
        <LayEditor
          value={value}
          onChange={this.onChange}
          locale={locale}
          placeholder={placeholder[locale]} />
        <p>
          <button onClick={this.onChangeLocale.bind(this, 'zh-CN')}>简体中文</button>
          &nbsp;&nbsp;
          <button onClick={this.onChangeLocale.bind(this, 'en-US')}>English</button>
        </p>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'))
