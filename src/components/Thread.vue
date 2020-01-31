<template lang="pug">
.thread(:key="thread.dat" :class="{ isread: isRead }")
  .title
    a(:href="`../thread?${createQuery(thread)}`" target="_blank" rel="noopener noreferrer") {{ thread.name }}
  .count {{ thread.count }}
  .read
    span(v-if="isRead") {{ readNumber }}
    button(v-if="isRead" @click="clear") ×
</template>

<script>
export default {
  // FIX: domainとかboard受け取るのがイマイチ。log取り出すために使う
  props: ['thread', 'appData', 'domain', 'board'],
  data: function() {
    return {
    }
  },
  computed: {
    isRead: function() {
      // FIX: logsのインターフェース見直す
      const logs = this.appData._logs[this.board]
      if(!logs){ return false }

      const index = Object.keys(logs).indexOf(this.thread.dat)
      return (index > -1)
    },
    readNumber: function() {
      // FIX: logsのインターフェース見直す
      const logs = this.appData._logs[this.board]
      if(!logs){ return false }

      return logs[this.thread.dat]
    }
  },
  methods: {
    createQuery: function() {
      const queries = []
      queries.push(`domain=${encodeURIComponent(this.domain)}`)
      queries.push(`subdomain=${encodeURIComponent(this.thread.subdomain)}`)
      queries.push(`board=${encodeURIComponent(this.thread.board)}`)
      queries.push(`dat=${encodeURIComponent(this.thread.dat)}`)

      return queries.join('&')
    },
    clear: function() {
      console.log(this.thread)
      this.appData.setLog(this.board, this.thread.dat, undefined)
    },
  }
}
</script>

<style lang="sass">
.thread
  border: solid 1px lightgray
  padding: 2px

  div
    display: inline-block
    margin-left: 2px
    margin-right: 2px
  .title
    width: 80%

.thread.header
  background-color: gray

.thread.isread
  background-color: lightyellow

</style>
