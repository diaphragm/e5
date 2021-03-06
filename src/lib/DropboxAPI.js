
// const APP_KEY = 'gr51jpel8c7ft93'
const DBX_OAUTH2_URL = 'https://www.dropbox.com/oauth2/authorize'
const DBX_UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload'
const DBX_DOWNLOAD_URL = 'https://content.dropboxapi.com/2/files/download'
// const CONFIG_FILE_PATH = '/test.txt'

export default class DropboxAPI {
  constructor(appData) {
    this.appData = appData
  }

  authUrl() {
    const appkey = this.appData.config.dropbox.appKey
    const redirectUri = encodeURI(window.location.href)
    const url = `${DBX_OAUTH2_URL}?client_id=${appkey}&response_type=token&redirect_uri=${redirectUri}`
    return url
  }

  getCallbackQueries() {
    if(window.location.hash.length == 0){ return {} }

    const queries = window.location.hash.slice(1).split('&').reduce((obj, x) => {
      const [key, value] = x.split('=')
      obj[key] = value
      return obj
    }, {})
    console.log(queries)
    return queries
  }

  // fetchApi(url, data = {}) {
  //   const access_token = this.appData.config.dropbox.accessToken
  //   return fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${access_token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //   })
  // }

  uploadData (path, data = {}) {
    const access_token = this.appData.config.dropbox.accessToken

    if( !access_token ) { return }

    return fetch(DBX_UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: path,
          mode: 'overwrite',
        })
      },
      body: JSON.stringify(data, null, 2)
    })
  }

  downloadData(path) {
    const access_token = this.appData.config.dropbox.accessToken

    if( !access_token ) { return {} }

    return fetch(DBX_DOWNLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: path,
        })
      }
    }).then((res) => {
      return res.json()
    })
  }

}
