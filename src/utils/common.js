export function forEach(obj, callback) {
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key])
      }
    }
  }
}

export function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function hasProperty(obj, property) {
  let result = false
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true
        break
      }
    }
  }
  return result
}
