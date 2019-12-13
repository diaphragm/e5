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
    console.log("CM.js", this._boards)
    localStorage.setItem('boards', JSON.stringify(this._boards))
  }

  save() {
    console.log(this.config)
    localStorage.setItem('logs', JSON.stringify(this.logs))
  }

  clear() {
    localStorage.clear()
  }
}
