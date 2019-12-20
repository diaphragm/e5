<template lang="pug">
#app
  h1 {{ name }}
  .tools
    button(@click="reload") Reload(fetch)
    button(@click="clear") Clear
    button(@click="sortLogs") debug sortLogs
  .threads
    .thread.header
      .title タイトル
      .count レス数
    Thread(v-for="thread in threads" :thread="thread" :domain="domain" :board="board" :config="config" :key="thread.dat")
</template>

<script>
document.title = 'e5- スレ一覧'

import * as Util from 'lib/Utility.js'
import ConfigManager from 'lib/ConfigManager.js'
import AbstractBBS from 'lib/AbstractBBS'
const bbs = new AbstractBBS
import Thread from 'components/Thread.vue'

export default {
  data: function() {
    return {
      config: new ConfigManager(),
      domain: "",
      board: "",
      threads: [],
      name: ""
    }
  },
  components: {
    Thread
  },
  mounted: async function() {
    let query = Util.getQueryParameters()
    let domain = query['domain']
    let board = query['board']
    let data = await bbs.getThreads(domain, board)
    let threads = data['threads']

    // FIX: スレの名前を取得する
    let name = board

    this.domain = domain
    this.board = board
    this.threads = threads
    this.name = name

    this.sortLogs()
  },
  methods: {
    reload: async function() {
      let data = await bbs.reloadThreads(this.domain, this.board)
      this.threads = data['threads']
    },
    clear: function() {
      this.config.setThreads(this.board, undefined)
    },
    sortLogs: function() {
      let logs = this.config._logs[this.board]
      if(!logs){ return }

      Object.keys(logs).forEach((dat) => {
        let index = this.threads.findIndex(t => t.dat == dat)
        let deleted = this.threads.splice(index, 1)[0]
        this.threads.unshift(deleted)
      })
    },
  }
}
</script>

<style lang="sass">
*, *::before, *::after
  box-sizing: border-box

#app
  max-width: 800px
  margin: 0 auto
  line-height: 1.4
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

h1
  text-align: center

</style>
