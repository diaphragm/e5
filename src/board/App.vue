<template lang="pug">
div#app
  h1 スレ一覧
  div.threads
    div.thread(v-for="thread in threads")
      a(:href="`thread?${createQuery(thread)}`") {{ thread.name }}
      span {{ thread.count }}
</template>

<script>
document.title = "スレ一覧"

import * as Util from "lib/Utility.js"
import ConfigManager from "lib/ConfigManager.js"
import AbstractBBS from "lib/AbstractBBS"
const bbs = new AbstractBBS

export default {
  data: function() {
    return {
      config: new ConfigManager(),
      domain: "",
      board: "",
      threads: []
    }
  },
  components: {
  },
  mounted: async function() {
    let query = Util.getQueryParameters()
    let domain = query['domain']
    let board = query['board']
    let data = await bbs.getThreads(domain, board)
    let threads = data['threads']

    this.domain = domain
    this.board = board
    this.threads = threads
  },
  methods: {
    createQuery(thread) {
      let queries = []
      queries.push(`domain=${encodeURIComponent(this.domain)}`)
      queries.push(`subdomain=${encodeURIComponent(thread.subdomain)}`)
      queries.push(`board=${encodeURIComponent(thread.board)}`)
      queries.push(`dat=${encodeURIComponent(thread.dat)}`)

      return queries.join('&')
    }
  }
}
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  text-align: center;
}

.thread {
  border: solid 1px;
  margin: 1em;
}
</style>
