<template lang="pug">
div#app
  h1 {{ name }}
  div.comments(v-for="comment in comments")
    Comment(:comments="comments" :number="comment.number")
</template>

<script>
document.title = "e5 - Viewer"

import * as Util from "lib/Utility.js"
import ConfigManager from "lib/ConfigManager.js"
import AbstractBBS from "lib/AbstractBBS"
const bbs = new AbstractBBS

import Comment from 'components/Comment.vue'

export default {
  data: function() {
    return {
      config: new ConfigManager(),
      domain: "",
      subdomain: "",
      board: "",
      dat: "",
      name: "",
      comments: [],
      thread: {}
    }
  },
  components: {
    Comment
  },
  mounted: async function() {
    let query = Util.getQueryParameters()
    let domain = query['domain']
    let subdomain = query['subdomain']
    let board = query['board']
    let dat = query['dat']

    let data = await bbs.getCache(domain, subdomain, board, dat)
    let thread = data['thread']
    let comments = data['comments']

    this.domain = domain
    this.subdomain = subdomain
    this.board = board
    this.dat = dat
    this.name = thread['name']
    this.comments = comments

    document.title = `e5 - ${this.name}`
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
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.4;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  text-align: center;
}
</style>
