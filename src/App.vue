<template>
  <div id="app">
    <router-view  v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
}
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
</style>
