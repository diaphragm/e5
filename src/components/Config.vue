<template lang="pug">
.config
  textarea.editor(v-model="json")
  button.save(@click="save") Save
  button.auth(@click="auth") Outh
</template>

<script>
import Vue from 'vue'
import DropboxAPI from 'lib/DropboxAPI.js'

export default {
  props: ['config'],
  components: {
  },
  data: function() {
    return {
      json: JSON.stringify(this.config.config, null, 2),
      dbx: new DropboxAPI(this.config)
    }
  },
  methods: {
    save: function() {
      const data = JSON.parse(this.json)
      console.log(data)
      this.config.config = data
    },
    auth: function() {
      if( confirm('Dropboxへ認証します') ) {
        const url = this.dbx.authUrl()
        window.location.href = url
      }
    }
  },
  mounted: function() {
    const queries = this.dbx.getCallbackQueries()
    if (queries.access_token) {
      const data = this.config.config
      data.dropbox.accessToken = queries.access_token
      this.config.config = data
    }
  }
}
</script>

<style lang="sass">
.editor
  width: 100%
  height: 200px
</style>
