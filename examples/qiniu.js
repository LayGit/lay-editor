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
    // returned param will mix the params you set in qiniu config
    return {
      domain: '',
      // will override 'test.jpg'
      // key: file.name,
      key: 'KEY FROM SERVER',
      token: 'TOKEN FROM SERVER'
    }
  }

  render () {
    const toolbar = {
      image: {
        // default is base64
        upto: 'qiniu',
        // input accept attribute
        accept: 'image/gif,image/jpeg,image/jpg,image/png',
        // max file size, numeric bytes, m(MB), k(KB)
        maxSize: 2048 * 1024 || '2m' || '2048k',
        // upload config
        qiniu: {
          // (required) qiniu upload token
          token: '',
          // (required) qiniu bucket domain
          domain: 'http://YOUR QINIU BUCKET DOMAIN',
          // (optional) qiniu bucket area, see: https://developer.qiniu.com/kodo/manual/1671/region-endpoint
          area: 'z0',
          // (optional) qiniu upload key
          key: 'test.jpg',
          // (optional) qiniu style suffix
          style: '!small',
          // (optional) a Promise or a async/await function which you can used to get uplaod data params from server
          // if you set dataFn and returned 'token' or 'domain' from dataFn, then 'token' or 'domain' in qiniu could be optional
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
