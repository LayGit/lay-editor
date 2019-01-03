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

  getParamFromServer = async (file, callback) => {
    await console.log('you can request params from server')

    // if you throw a exception upload will stopped and show the error
    // throw 'error'

    // upload will be started after function returned
    // returned param will mix the params you set in aliyun config
    return {
      domain: 'DOMAIN FROM SERVER',
      // will override 'test.jpg'
      key: file.name,
      // aliyun accessKeyId
      accessKeyId: 'ACCESS KEY ID FROM SERVER',
      // signature
      sign: 'SIGN FROM SERVER',
      // policy
      policy: 'POLICY FROM SERVER',
    }
  }

  render () {
    const toolbar = {
      image: {
        // default is base64
        upto: 'aliyun',
        // input accept attribute
        accept: 'image/gif,image/jpeg,image/jpg,image/png',
        // max file size, numeric bytes, m(MB), k(KB)
        maxSize: 2048 * 1024 || '2m' || '2048k',
        // upload config
        aliyun: {
          // (required) oss domain
          domain: '',
          // (required) aliyun accessKeyId
          accessKeyId: '',
          // (required) oss upload policy
          policy: '',
          // (required) oss upload sign
          sign: '',
          // (required) aliyun upload key
          key: 'test.jpg',
          // (optional) a Promise or a async/await function which you can used to get uplaod data params from server
          // if you set dataFn and returned required params from dataFn, then config in aliyun could be optional
          dataFn: this.getParamFromServer
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
