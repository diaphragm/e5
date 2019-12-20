// configをlocalStorageやクラウドと同期するためのクラス

export default class ConfigManager {
  constructor() {
    // 設定
    if (localStorage.config) {
      this._config = JSON.parse(localStorage.getItem('config'))
    } else {
      this._config = {}
    }
    // 板情報
    if (localStorage.boards) {
      this._boards = JSON.parse(localStorage.getItem('boards'))
    } else {
      this._boards = {}
    }
    // 既読履歴など
    if (localStorage.logs) {
      this._logs = JSON.parse(localStorage.getItem('logs'))
    } else {
      this._logs = {}
    }
    // スレのキャッシュ
    if (localStorage.cache) {
      this._cache = JSON.parse(localStorage.getItem('cache'))
    } else {
      this._cache = {}
    }
  }

  get boards() {
    return this._boards
  }
  set boards(val) {
    this._boards = val
    console.log("CM.js/boards", this._boards)
    localStorage.setItem('boards', JSON.stringify(this._boards))
  }

  getLog(board, dat) {
    let logs = this._logs

    if (logs[board]) {
      return logs[board][dat]
    } else {
      return undefined
    }
  }
  setLog(board, dat, number) {
    let logs = this._logs

    if (logs[board]) {
      logs[board][dat] = number
    } else {
      logs[board] = {}
      logs[board][dat] = number
    }

    this._logs = logs
    console.log("CM.js/logs", this._logs)
    localStorage.setItem('logs', JSON.stringify(this._logs))
  }

  getCache(board, dat) {
    let cache = this._cache

    if(cache[board]) {
      return cache[board][dat]
    } else {
      return undefined
    }
  }
  setCache(board, dat, data) {
    let cache = this._cache

    if (cache[board]) {
      cache[board][dat] = data
    } else {
      cache[board] = {}
      cache[board][dat] = data
    }

    this._cache = cache
    console.log("CM.js/cache", this._cache)
    localStorage.setItem('cache', JSON.stringify(this._cache))
  }

  clear() {
    localStorage.clear()
  }
}
