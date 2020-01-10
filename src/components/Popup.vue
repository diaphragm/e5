<template lang="pug">
span
  a(:href="jumpTo" @mouseover="isPopup = true") {{ refer }}
  div.popup(v-if="isPopup" @mouseleave="mouseLeave")
    Comment(v-for="number in numbers" :comments="comments" :number="number" :key="number")
</template>

<script>
import { toHalfWidth } from 'lib/Utility.js'

export default {
  // referには >>1-50とか＞＞1,2,3とか受けられるようにする
  props: ['comments', 'refer'],
  data: function() {
    return {
      isPopup: false
    }
  },
  components: {
    // Comment.vueで動的にtemplate生成してるせいで
    // 普通にimport文だと読み込んでくれないのでimport式を使う
    // https://jp.vuejs.org/v2/guide/components-edge-cases.html#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E9%96%93%E3%81%AE%E5%BE%AA%E7%92%B0%E5%8F%82%E7%85%A7
    Comment: () => import('components/Comment.vue')
  },
  computed: {
    numbers: function() {
      const str = toHalfWidth(this.refer)

      // >>10-20 みたいなパターン
      const m = str.match(/(\d+)[-ｰ](\d+)/)
      if(m) {
        const s = +m[1]
        const e = +m[2]
        return Array(e-s+1).fill(0).map((x, i) => s + i)
      }

      // >>10,15,20 みたいなパターン
      return str.match(/\d+/g)
    },
    jumpTo: function() {
      return `#${this.numbers[0]}`
    }
  },
  methods: {
    mouseLeave: function() {
      this.isPopup = false
    }
  }
}
</script>

<style lang="sass">
.comment
  border: solid 1px;
  margin: 1em;

  .header
    background-color: lightgray;
    span
      margin-left: 1em;
</style>
