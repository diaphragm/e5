<template lang="pug">
.config
  textarea.editor(v-model="json")
  button.save(@click="save") Save
  button.auth(@click="auth") Outh
  button(@click="upload") UploadConfig
  button(@click="download") DownloadConfig
  button(@click="downloadLogs") DownloadLogs
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
      this.config.save()
    },
    auth: function() {
      if( confirm('Dropboxへ認証します') ) {
        const url = this.dbx.authUrl()
        window.location.href = url
      }
    },
    upload: function() {
      const path = this.config.config.dropbox.configFilePath
      this.dbx.uploadData(path, this.config.config)
      console.log('uploading...')
    },
    download: async function() {
      const data = await this.dbx.downloadData()
      console.log(data)
      this.config.config = data
      this.config.save()
    },
    downloadLogs: async function() {
      this.config.downloadLogs()
    }
  },
  mounted: function() {
    const queries = this.dbx.getCallbackQueries()
    if (queries.access_token) {
      this.config.config.dropbox.accessToken = queries.access_token
      this.config.save()
    }
  }
}
</script>

<style lang="sass">
.editor
  width: 100%
  height: 200px
</style>
