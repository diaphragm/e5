<template lang="pug">
div.comment(:id="comment.number")
  div.header
    span {{ comment.number }}
    span {{ comment.name }}
    span [{{ comment.mail }}]
    span {{ comment.id }}
  component(:is="CommentMessage" :comments="comments" :number="number")
</template>

<script>
import Popup from 'components/Popup.vue'

export default {
  props: ['comments', 'number'],
  data: function() {
    return {}
  },
  computed: {
    comment: function() {
      // TODO:見つからなかったときのエラー処理
      return this.comments.find(c => c.number == this.number)
    },
    // 動的にtemplateを生成するためにコンポーネントに切り分けてcomputedで呼び出す
    CommentMessage: function() {
      // templateの生成
      const reRefer = /[>＞]{2}[0-9０-９]+/g
      const reUrl = /https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/g
      const reImage = /https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?\.(jpe?g|png|gif|svg)/g

      let tmp = this.comment.message
      let images = tmp.match(reImage)

      tmp = tmp.replace(/\n/g, '<br>')
      tmp = tmp.replace(reRefer, '<Popup refer="$&" :comments="comments"></Popup>')
      tmp = tmp.replace(reUrl, '<a href="$&">$&</a>')

      if(images) {
        tmp += '<div class="thumbnails">'
        tmp += images.map(url => `<a href="${url}"><img class="thumbnail" src="${url}" /></a>`).join()
        tmp += '</div>'
      }

      // 単一rootにする
      tmp = `<div>${tmp}</div>`

      return {
        name: 'CommentMessage',
        props: ['comments', 'number'],
        template: tmp,
        components: { Popup }
      }
    }
  },
}
</script>

<style lang="sass">
.comment
  border: solid 1px
  margin: 1em

  .header
    background-color: lightgray
    span
      margin-left: 1em

.thumbnail
  height: 100px
</style>
