// configをlocalStorageやクラウドと同期するためのクラス

export default class ConfigManager {
  constructor() {
    if (localStorage.config) {
      this._config = JSON.parse(localStorage.getItem('config'))
    } else {
      this._config = {}
    }
    if (localStorage.boards) {
      this._boards = JSON.parse(localStorage.getItem('boards'))
    } else {
      this._boards = {}
    }
    if (localStorage.logs) {
      this._logs = JSON.parse(localStorage.getItem('logs'))
    } else {
      this._logs = {}
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

    if(logs[board]) {
      return logs[board][dat]
    } else {
      return undefined
    }
  }
  setLog(board, dat, data) {
    let logs = this._logs

    if (logs[board]) {
      logs[board][dat] = data
    } else {
      logs[board] = {}
      logs[board][dat] = data
    }

    this._logs = logs
    console.log("CM.js/logs", this._logs)
    localStorage.setItem('logs', JSON.stringify(this._logs))
  }

  clear() {
    localStorage.clear()
  }
}
