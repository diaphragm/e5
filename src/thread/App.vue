<template lang="pug">
#app
  h1 {{ name }}
  .tools
    button(@click="reload") Reload
    button(@click="clear") Log Clear
  .comments
    .comment-container(v-for="comment in comments" :key="comment.number")
      Comment(:comments="comments" :number="comment.number" )
      .read(v-if="comment.number == read")
        hr
        span ここまで読んだ
    .comment-dummy
</template>

<script>
document.title = 'e5 - Viewer'

import * as Util from 'lib/Utility.js'
import ConfigManager from 'lib/ConfigManager.js'
import AbstractBBS from 'lib/AbstractBBS'
const bbs = new AbstractBBS

import Vue from 'vue'
import Comment from 'components/Comment.vue'

export default {
  data: function() {
    return {
      config: new ConfigManager(),
      domain: '',
      subdomain: '',
      board: '',
      dat: '',
      name: '',
      comments: [],
      read: 1,
      intersectings: {}
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
    this.read = this.config.getLog(board, dat) || 1

    document.title = `e5 - ${this.name}`

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // FIX: 生ElementからVueComponentを取得するの気持ち悪い
        let number = entry.target.__vue__.number
        // Vue.set(this.intersectings, number, entry.isIntersecting)
        if(entry.isIntersecting) {
          if(number > this.read) {
            this.read = number
            this.config.setLog(this.board, this.dat, number)
          }
        }
      })
    }, {
      // 真ん中を閾値にするために-50%にしたけど負の値にしていいのか謎
      rootMargin: '-60% 0px -40% 0px'
    })
  },
  updated: function() {
    this.observer.disconnect()
    document.querySelectorAll('.comment').forEach((elem) => {
      this.observer.observe(elem)
    })
  },
  methods: {
    reload: async function() {
      let data = await bbs.reloadCache(this.domain, this.subdomain, this.board, this.dat)
      this.comments = data['comments']
    },
    clear: function() {
      this.config.setLog(this.board, this.dat, undefined)
      this.config.setCache(this.board, this.dat, undefined)
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

.comment-dummy {
  height: 50vh;
}
</style>
