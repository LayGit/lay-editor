import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

const contentToValue = (content) => {
  return EditorState.createWithContent(convertFromRaw(content))
}

const valueToContent = (value = EditorState.createEmpty()) => {
  return convertToRaw(value.getCurrentContent())
}

const htmlToContent = (html) => {
  const contentBlock = htmlToDraft(html)
  if (contentBlock) {
    return ContentState.createFromBlockArray(contentBlock.contentBlocks)
  } else {
    return ContentState.createFromText('')
  }
}

const htmlToValue = (html) => {
  const contentState = htmlToContent(html)
  return EditorState.createWithContent(contentState)
}

const contentToHtml = (content) => {
  return draftToHtml(content)
}

const valueToHtml = (value) => {
  return contentToHtml(valueToContent(value))
}

export {
  contentToValue,
  valueToContent,
  htmlToContent,
  htmlToValue,
  contentToHtml,
  valueToHtml,
}
