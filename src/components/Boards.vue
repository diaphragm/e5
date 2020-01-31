<template lang="pug">
div.boards
  template(v-if="Object.keys(appData.boards).length")
    div(v-for="(subboards, category) in appData.boards")
      div.board-category(@click="showCategory(category)") {{ category }}
      div(v-if="showStatuses[category]")
        div(v-for="board in subboards")
          a(:href="`board?domain=${board.domain}&board=${board.board}`" target="_blank" rel="noopener noreferrer") {{ board.name }}
  template(v-else)
    | 板情報がありません。更新ボタンで取得してください。
  button(@click="reloadBoards()") 板一覧を更新
</template>

<script>
import Vue from 'vue'
import AbstractBBS from 'lib/AbstractBBS.js'
const bbs = new AbstractBBS()

export default {
  props: ['appData'],
  components: {
  },
  data: function() {
    return {
      showStatuses: {}
    }
  },
  methods: {
    showCategory: function(category) {
      console.log(category, this.showStatuses[category])
      if(this.showStatuses[category]) {
        this.$set(this.showStatuses, category, false)
      } else {
        this.$set(this.showStatuses, category, true)
      }
    },
    reloadBoards: async function() {
      const data = await bbs.getBoards()
      this.appData.boards = data
    },
    debug: function () {
      console.log(this.appData.boards)
    }
  }
}
</script>

<style lang="sass">
.board-category
  font-weight: bold
  cursor: default
</style>
