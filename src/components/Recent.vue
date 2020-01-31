<template lang="pug">
#app
  .threads
    .thread.header
      .title タイトル
      .count レス数
    Thread(v-for="thread in threads" :thread="thread" :appData="appData" :key="thread.dat")
</template>

<script>
document.title = 'e5 - 最近読んだスレ'

import * as Util from 'lib/Utility.js'
import AppDataManager from 'lib/AppDataManager.js'
import AbstractBBS from 'lib/AbstractBBS'
const bbs = new AbstractBBS
import Thread from 'components/Thread.vue'

export default {
  props: ['appData'],
  data: function() {
    return {
    }
  },
  components: {
    Thread
  },
  computed: {
    threads: function() {
      const ret = []
      const logs = this.appData.logs
      Object.keys(logs).forEach((board) => {
        Object.keys(logs[board]).forEach((dat) => {
          const cache = this.appData.getCache(board, dat)
          ret.push(cache.thread)
        })
      })

      return ret
    }
  },
  mounted: async function() {
  },
  methods: {
    reload: async function() {
      const data = await bbs.reloadThreads(this.domain, this.board)
      this.threads = data['threads']
    },
    clear: function() {
      this.appData.setThreads(this.board, undefined)
    },
    sortLogs: function() {
      const logs = this.appData._logs[this.board]
      if(!logs){ return }

      Object.keys(logs).forEach((dat) => {
        const index = this.threads.findIndex(t => t.dat == dat)
        const deleted = this.threads.splice(index, 1)[0]
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
