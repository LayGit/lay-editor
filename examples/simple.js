import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LayEditor } from '../src/index'
import 'lay-editor/assets/editor.less'

class Test extends Component {
  state = {
    value: undefined
  }

  onChange = (value) => {
    this.setState({ value })
  }

  render () {
    return (
      <div style={{ padding: 20 }}>
        <LayEditor value={this.state.value} onChange={this.onChange} placeholder="写点什么吧..." />
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'))
