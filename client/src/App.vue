<template>
  <div id="app">
    <HighlightComponent />
  </div>
</template>

<script>
import HighlightComponent from './components/HighlightComponent.vue'

export default {
  name: 'app',
  components: {
    HighlightComponent
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #ccc;
  /* margin: 10px 30px; */
}
</style>
