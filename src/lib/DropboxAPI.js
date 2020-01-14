
// const APP_KEY = 'gr51jpel8c7ft93'
const DBX_OAUTH2_URL = 'https://www.dropbox.com/oauth2/authorize'
const DBX_UPLOAD_URL = 'https://content.dropboxapi.com/2/files/upload'
const DBX_DOWNLOAD_URL = 'https://content.dropboxapi.com/2/files/download'
// const CONFIG_FILE_PATH = '/test.txt'

export default class DropboxAPI {
  constructor(config) {
    this.appKey = config.config.dropbox.appKey
    this.configFilePath = config.config.dropbox.configFilePath
  }

  authUrl() {
    const redirectUri = encodeURI(window.location.href)
    const url = `${DBX_OAUTH2_URL}?client_id=${this.appKey}&response_type=token&redirect_uri=${redirectUri}`
    return url
  }

  getCallbackQueries() {
    const queries = window.location.hash.slice(1).split('&').reduce((obj, x) => {
      const [key, value] = x.split('=')
      obj[key] = value
      return obj
    }, {})
    console.log(queries)
    return queries
  }

  fetchApi(url, data = {}) {
    const access_token = localStorage.dbx_access_token
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  uploadDat (data = {}) {
    const access_token = localStorage.dbx_access_token
    return fetch(DBX_UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: this.configFilePath,
          mode: 'overwrite',
        })
      },
      body: JSON.stringify(data, null, 2)
    })
  }

  downloadData() {
    const access_token = localStorage.dbx_access_token
    return fetch(DBX_DOWNLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: this.configFilePath,
        })
      }
    }).then((res) => {
      return res.json()
    })
  }

}