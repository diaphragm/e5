<template lang="pug">
div#app
  h1 Threads
</template>

<script>
import ConfigManager from "./lib/ConfigManager.js"

export default {
  data: function() {
    return {
      config: new ConfigManager()
    }
  },
  components: {
  }
}

console.log(window.location.search)
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
