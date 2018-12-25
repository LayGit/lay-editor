export default class FocusHandler {
  inputFocused = false
  editorMouseDown = false

  onEditorMouseDown = () => {
    this.editorFocused = true
  }

  onInputMouseDown = () => {
    this.inputFocused = true
  }

  isEditorBlur = (e) => {
    const tagName = e.target.tagName
    if ((tagName === 'INPUT' || tagName === 'LABEL') && !this.editorFocused) {
      this.inputFocused = false
      return true
    } else if ((tagName !== 'INPUT' || tagName !== 'LABEL') && !this.inputFocused) {
      this.editorFocused = false
      return true
    }
    return false
  }

  isEditorFocused = () => {
    if (!this.inputFocused) {
      return true
    }
    this.inputFocused = false
    return false
  }

  isToolbarFocused = () => {
    if (!this.editorFocused) {
      return true
    }
    this.editorFocused = false
    return false
  }

  isInputFocused = () => {
    return this.inputFocused
  }
}
