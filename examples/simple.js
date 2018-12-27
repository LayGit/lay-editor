import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { LayEditor, htmlToValue, contentToValue, valueToHtml, valueToContent } from '../src/index'

class Test extends Component {
  state = {
    // EditorState
    value: undefined,
    html: '',
    content: ''
  }

  onHtmlToValue = () => {
    const html = '<p>html value</p>'
    this.setState({
      value: htmlToValue(html)
    })
  }

  onContentToValue = () => {
    const content = '{"blocks":[{"key":"bk33u","text":"raw content","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    this.setState({
      value: contentToValue(JSON.parse(content))
    })
  }

  onChange = (value) => {
    this.setState({ value })
  }

  render () {
    const { value, html, content } = this.state
    return (
      <div style={{ padding: 20 }}>
        <LayEditor
          value={value}
          onChange={this.onChange}
          placeholder="write something..." />
        <p>
          <button onClick={this.onHtmlToValue}>html to value</button>
          &nbsp;&nbsp;
          <button onClick={this.onContentToValue}>content to value</button>
        </p>
        <p>
          convert value to html<br />
          <textarea
            readOnly
            style={{ width: '100%' }}
            rows={5}
            value={valueToHtml(value)} />
        </p>
        <p>
          convert value to raw object<br />
          <textarea
            readOnly
            style={{ width: '100%' }}
            rows={5}
            value={JSON.stringify(valueToContent(value))} />
        </p>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.getElementById('__react-content'))
