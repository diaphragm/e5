import { unescapeHTML } from 'lib/Utility.js'
import AppDataManager from 'lib/AppDataManager.js'

const appData = new AppDataManager()

export default class AbstractBBS {
  constructor() {
  }

  async getBoards() {
    let url = appData.config.bbs.boardsUrl
    const res = await fetch(url, { mode: 'cors', credentials: 'include'})
    const data = await res.text()

    const ret = {}
    let category = ''
    let m = undefined

    data.split('\n').forEach((line) => {
      m = line.match(/<br><br><B>(.+?)<\/B><br>/)
      if (m) {
        category = m[1]
        ret[category] = []
      }
      m = line.match(/<A HREF=http:\/\/(.+)\.(5ch\.net|bbspink\.com)\/(.+)\/>(.+)<\/A>/)
      if (m) {
        ret[category].push( {domain: m[2], subdomain: m[1], board: m[3], name: m[4]})
      }
    })

    return ret
  }

  async getThreads(domain, board) {
    const data = appData.getThreads(board)
    if (data) {
      return data
    } else {
      return this.reloadThreads(domain, board)
    }
  }

  async reloadThreads(domain, board) {
    const data = await this.fetchThreads(domain, board)
    appData.setThreads(board, data)
    return data
  }

  async fetchThreads(domain, board) {
    let url = appData.config.bbs.threadsUrl
    url = url.replace('{{domain}}', domain)
    url = url.replace('{{board}}', board)

    const res = await fetch(url, { mode: 'cors', credentials: 'include' })
    const data = await res.json()

    const ret = {}
    ret['count'] = data['total_count']
    ret['threads'] = data['threads'].map((thread) => {
      const path = thread[3].split('/')
      return {
        domain: domain,
        subdomain: thread[2],
        board: path[0],
        dat: path[1],
        name: thread[5],
        count: thread[1]
      }
    })

    console.log('fetchThreads', ret)
    return ret
  }

  async getCache(domain, subdomain, board, dat) {
    const data = appData.getCache(board, dat)
    if(data) {
      return data
    } else {
      return this.reloadCache(domain, subdomain, board, dat)
    }
  }

  async reloadCache(domain, subdomain, board, dat) {
    const data = await this.fetchCache(domain, subdomain, board, dat)
    appData.setCache(board, dat, data)
    return data
  }

  async fetchCache(domain, subdomain, board, dat) {
    let url = appData.config.bbs.cacheUrl
    url = url.replace('{{domain}}', domain)
    url = url.replace('{{subdomain}}', subdomain)
    url = url.replace('{{board}}', board)
    url = url.replace('{{dat}}', dat)

    const res = await fetch(url, { mode: 'cors', credentials: 'include' })
    const data = await res.json()

    const thread = data['thread']
    const path = thread[3].split('/')

    const ret = {}
    ret['count'] = data['total_count']
    ret['thread'] = {
      domain: domain,
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
