export const getQueryParameters = () => {
  const queryString = window.location.search.slice(1)
  if(queryString.length == 0) { return {} }

  return queryString.split('&').reduce((obj, str) => {
    let [key, value] = str.split('=')
    key = decodeURIComponent(key)
    value = value && decodeURIComponent(value)
    obj[key] = value
    return obj
  }, {})
}

export const escapeHTML = (str) => {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
}

export const unescapeHTML = (str) => {
  return str.replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

export const toHalfWidth = (str) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (c) {
    return String.fromCharCode(c.charCodeAt(0) - 0xFEE0);
  })
}

export const debounce = (fn, interval) => {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn()
    }, interval)
  }

}

// sourceを破壊する
export const deepAssign = (object, source) => {
  Object.keys(source).forEach((key) => {
    if (typeof (source[key]) === 'object') {
      if (!object[key]) {
        object[key] = {}
      }
      deepAssign(object[key], source[key])
    } else {
      object[key] = source[key]
    }
  })

  return object
}
