let callbacks = []

export default {
  onKeyDown: (e) => {
    callbacks.forEach(callback => callback(e))
  },
  registerCallBack: callback => {
    callbacks.push(callback)
  },
  deregisterCallBack: callback => {
    callbacks = callback.filter(cb => cb !== callback)
  },
}
