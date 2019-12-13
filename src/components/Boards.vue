<template lang="pug">
div.boards
  template(v-if="Object.keys(config.boards).length")
    div(v-for="(subboards, category) in config.boards")
      div.board-category {{ category }}
      div(v-for="board in subboards")
        a(:href="'threads?'+board.name") {{ board.name }}
  template(v-else)
    | 板情報がありません。更新ボタンで取得してください。
  button(@click="getBoards()") 板一覧を更新
</template>

<script>
import Vue from 'vue'

export default {
  props: ['config'],
  components: {
  },
  methods: {
    getBoards: async function() {
      let res = await fetch("https://e5.9kv.org/boards", {mode: 'cors'})
      let json = await res.json()
      this.config.boards = json
      return json
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
