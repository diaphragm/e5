<template lang="pug">
div.comment(:id="comment.number" v-if="comment")
  div.header
    span {{ comment.number }}
    span {{ comment.name }}
    span [{{ comment.mail }}]
    span {{ date }}
    span {{ comment.date }}
    span {{ comment.id }}
  component(:is="CommentMessage" :comments="comments" :number="number")
</template>

<script>
import { escapeHTML } from 'lib/Utility.js'
import Popup from 'components/Popup.vue'

export default {
  props: ['comments', 'number'],
  data: function() {
    return {}
  },
  computed: {
    comment: function() {
      // TODO: 見つからなかったときのエラー処理
      // FIXME: ↑ v-ifで非表示にした。いまいち？
      return this.comments.find(c => c.number == this.number)
    },
    date: function() {
      let date = new Date(Number(this.comment.date)*1000)
      return date.toLocaleString('ja-JP')
    },
    // 動的にtemplateを生成するためにコンポーネントに切り分けてcomputedで呼び出す
    CommentMessage: function() {
      // templateの生成
      const reRefer = /(&gt;|＞){2}[0-9０-９][,\-ｰ0-9０-９]*/g // escapeHTMLされたあとなので&gt;
      const reUrl = /https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/g
      const reImageUrl = /https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?\.(jpe?g|png|gif|svg)/g

      let tmp = this.comment.message
      let images = tmp.match(reImageUrl) // 色々処理する前に画像URL拾っておく

      // 色々処理
      tmp = escapeHTML(tmp)
      tmp = tmp.replace(/\n/g, '<br>')
      tmp = tmp.replace(reRefer, '<Popup refer="$&" :comments="comments"></Popup>')
      tmp = tmp.replace(reUrl, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>')

      // サムネくっつける
      if(images) {
        tmp += '<div class="thumbnails">'
        tmp += images.map(url => `<a href="${url}" target="_blank" rel="noopener noreferrer"><img class="thumbnail" src="${url}" /></a>`).join('')
        tmp += '</div>'
      }

      // 単一rootにする
      tmp = `<div>${tmp}</div>`

      // Vueコンポーネントを返す
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
