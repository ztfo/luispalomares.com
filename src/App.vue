<template lang="pug">
#app
  NavComponent
  GreetingComponent
  StatsGridComponent
  TaskList
</template>

<script>
import NavComponent from '@/components/Nav.vue';
import GreetingComponent from '@/components/Greeting.vue';
import StatsGridComponent from '@/components/StatsGrid.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    NavComponent,
    GreetingComponent,
    StatsGridComponent,
    TaskList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>