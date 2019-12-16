import { unescapeHTML } from 'lib/Utility.js'
import ConfigManager from 'lib/ConfigManager.js'

const config = new ConfigManager()

export default class AbstractBBS {
  constructor(config) {
    // 各APIはitest互換のjsonを返す
    this.boardsUrl = "https://e5.9kv.org/boards"
    this.threadsUrl = "https://e5.9kv.org/threads/{{domain}}/{{board}}"
    this.cacheUrl = "https://e5.9kv.org/cache/{{domain}}/{{subdomain}}/{{board}}/{{dat}}"
  }

  async getBoards() {

    let url = this.boardsUrl
    let res = await fetch(url, { mode: 'cors' })
    let data = await res.json()
    return data
  }

  async getThreads(domain, board) {
    let url = this.threadsUrl
    url = url.replace('{{domain}}', domain)
    url = url.replace('{{board}}', board)

    let res = await fetch(url, { mode: 'cors' })
    let data = await res.json()

    let ret = {}
    ret['count'] = data['total_count']
    ret['threads'] = data['threads'].map((thread) => {
      let path = thread[3].split('/')
      return {
        subdomain: thread[2],
        board: path[0],
        dat: path[1],
        name: thread[5],
        count: thread[1]
      }
    })

    return ret
  }

  async getCache(domain, subdomain, board, dat) {
    let data = config.getCache(board, dat)
    if(data) {
      return data
    } else {
      return this.reloadCache(domain, subdomain, board, dat)
    }
  }

  async reloadCache(domain, subdomain, board, dat) {
    let data = await this.fetchCache(domain, subdomain, board, dat)
    config.setCache(board, dat, data)
    return data
  }

  async fetchCache(domain, subdomain, board, dat) {
    let url = this.cacheUrl
    url = url.replace('{{domain}}', domain)
    url = url.replace('{{subdomain}}', subdomain)
    url = url.replace('{{board}}', board)
    url = url.replace('{{dat}}', dat)

    let res = await fetch(url, { mode: 'cors' })
    let data = await res.json()

    let thread = data['thread']
    let path = thread[3].split('/')

    let ret = {}
    ret['count'] = data['total_count']
    ret['thread'] = {
      subdomain: thread[2],
      board: path[0],
      dat: path[1],
      name: thread[5],
      count: thread[1]
    }
    ret['comments'] = data['comments'].map((comment) => {
      return {
        number: comment[0],
        name: comment[1],
        mail: comment[2],
        date: comment[3], // unixtime
        id: comment[4],
        message: unescapeHTML(comment[6].replace(/ <br> /g, '\n'))
      }
    })

    console.log('fetchCache', ret)
    return ret
  }
}
