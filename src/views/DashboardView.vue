<template lang="pug">
.dashboard
  .overview
    .container
      GreetingComponent
      StatsGridComponent
  .container
    TaskList
</template>

<script>
import GreetingComponent from '@/components/Greeting.vue';
import StatsGridComponent from '@/components/StatsGrid.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  components: {
    GreetingComponent,
    StatsGridComponent,
    TaskList
  }
}
</script>
