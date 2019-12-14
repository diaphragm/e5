<template lang="pug">
div#app
  h1 {{表示}}
  div.comments(v-for="comment in comments")
    div.comment
      div.comment-header
        span {{comment.number }}
        span {{ comment.name }}
        span [{{ comment.mail }}]
        span {{ comment.id }}
      div.comment-body {{ comment.message }}
</template>

<script>
import * as Util from "lib/Utility.js"
import ConfigManager from "lib/ConfigManager.js"
import AbstractBBS from "lib/AbstractBBS"
const bbs = new AbstractBBS

export default {
  data: function() {
    return {
      config: new ConfigManager(),
      domain: "",
      subdomain: "",
      board: "",
      dat: "",
      comments: []
    }
  },
  components: {
  },
  mounted: async function() {
    let query = Util.getQueryParameters()
    let domain = query['domain']
    let subdomain = query['subdomain']
    let board = query['board']
    let dat = query['dat']

    let comments = await bbs.getCache(domain, subdomain, board, dat)

    this.domain = domain
    this.subdomain = subdomain
    this.board = board
    this.dat = dat
    this.comments = comments
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

console.log(Util.getQueryParameters())
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

.comment {
  border: solid 1px;
  margin: 1em;
}

.comment-header {
  background-color: lightgray;

  span{
    margin-left: 1em;
  }
}

</style>
