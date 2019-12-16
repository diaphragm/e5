export const getQueryParameters = () => {
  let queryString = window.location.search.slice(1)
  if(queryString.length == 0) { return {} }

  let ret = {}
  queryString.split('&').forEach((str) => {
    let data = str.split('=')
    let key = decodeURIComponent(data[0])
    let value = data[1] && decodeURIComponent(data[1])
    ret[key] = value
  })

  return ret
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
