<template lang="pug">
div.boards
  template(v-if="Object.keys(config.boards).length")
    div(v-for="(subboards, category) in config.boards")
      div.board-category {{ category }}
      div(v-for="board in subboards")
        a(:href="`board?domain=${board.domain}&board=${board.board}`") {{ board.name }}
  template(v-else)
    | 板情報がありません。更新ボタンで取得してください。
  button(@click="reloadBoards()") 板一覧を更新
</template>

<script>
import Vue from 'vue'
import AbstractBBS from 'lib/AbstractBBS.js'
const bbs = new AbstractBBS()

export default {
  props: ['config'],
  components: {
  },
  methods: {
    reloadBoards: async function() {
      let data = await bbs.getBoards()
      this.config.boards = data
    },
    debug: function () {
      console.log(this.config.boards)
    }
  }
}
</script>

<style lang="sass">
.board-category
  font-weight: bold
</style>
