<template lang="pug">
div#app
  .debug-tools
    button(onclick="localStorage.clear()") dbg/clear
  hr
  h1 e5
  h2 板一覧
  Boards(:config="config")
  hr
  h2 設定
  Config(:config="config")
</template>

<script>
document.title = "e5"

import ConfigManager from "./lib/ConfigManager.js"
import Boards from "./components/Boards.vue"
import Config from "./components/Config.vue"

export default {
  data: function() {
    return {
      config: new ConfigManager()
    }
  },
  components: {
    Boards, Config
  }
}
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
</style>
