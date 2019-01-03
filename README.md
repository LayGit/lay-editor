# lay-editor

> React editor based on draftjs

[![NPM](https://img.shields.io/npm/v/lay-editor.svg)](https://www.npmjs.com/package/lay-editor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

 - Support qiniu upload
 - Support aliyun oss upload
 - Support custom server upload
 - i18n zh-CN / en-US
 - Popular functions of editor
 - Less is more

## Install

```bash
npm install --save lay-editor
```

## Example

[https://laygit.github.io/lay-editor/](https://laygit.github.io/lay-editor/)

## Usage

```jsx
import React, { Component } from 'react'

import { LayEditor } from 'lay-editor'
import 'lay-editor/dist/lay-editor.css'

class Example extends Component {
  render () {
    return (
      <LayEditor />
    )
  }
}
```

## License

MIT © [LayGit](https://github.com/LayGit)
