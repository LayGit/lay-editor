import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LayEditor, valueToHtml } from '../src/index'
import '../assets/index.less'

class Test extends Component {
  state = {
    value: undefined
  }

  onChange = (value) => {
    this.setState({ value })
  }

  render () {
    const toolbar = {
      image: {
        // default is base64
        upto: 'server',
        // input accept attribute
        accept: 'image/gif,image/jpeg,image/jpg,image/png',
        // max file size, numeric bytes, m(MB), k(KB)
        maxSize: 2048 * 1024 || '2m' || '2048k',
        // upload config
        server: {
          // form action url
          url: 'http://',
          // request headers, available in modern browsers
          headers: {},
          // file param post to server
          file: 'file',
          // other data object to post or a function which returns a data object
          data: {},
          // ajax upload with cookie send
          withCredentials: false,
          // call after post success, return image url or throw exception to trigger error
          resultFn: (response) => {
            // custom response flag
            if (response.code == 0) {
              return response.data.url
            } else {
              throw 'upload failed'
            }
          },
        },
      },
    }
    return (
      <div style={{ padding: 20 }}>
        <LayEditor
          toolbar={toolbar}
          value={this.state.value}
          onChange={this.onChange}
          placeholder="write something..." />
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'))
