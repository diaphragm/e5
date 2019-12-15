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

export const unescapeHTML = (text) => {
  const doc = (new DOMParser()).parseFromString(text, 'text/html')
  return doc.documentElement.textContent
}
