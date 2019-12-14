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
    let threads = data['threads'].map((thread) => {
      let path = thread[3].split('/')
      return {
        subdomain: thread[2],
        board: path[0],
        dat: path[1],
        name: thread[5],
        count: thread[1]
      }
    })

    return threads
  }

  async getCache(domain, subdomain, board, dat) {
    let url = this.cacheUrl
    url = url.replace('{{domain}}', domain)
    url = url.replace('{{subdomain}}', subdomain)
    url = url.replace('{{board}}', board)
    url = url.replace('{{dat}}', dat)

    let res = await fetch(url, { mode: 'cors' })
    let data = await res.json()
    let comments = data['comments'].map((comment) => {
      return {
        number: comment[0],
        name: comment[1],
        mail: comment[2],
        date: comment[3], // unixtime
        id: comment[4],
        message: comment[6]
      }
    })

    return comments
  }
}
