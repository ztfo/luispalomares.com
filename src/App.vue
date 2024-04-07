<template lang="pug">
#app
  NavComponent
  router-view
</template>

<script>
import NavComponent from '@/components/Nav.vue';

export default {
  components: {
    NavComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>