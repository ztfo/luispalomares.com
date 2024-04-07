<template lang="pug">
  .dashboard
    h1 Dashboard
</template>

<script>

import Nav from '@/components/Nav.vue'
import Greeting from '@/components/Greeting.vue'
import StatsGrid from '@/components/StatsGrid.vue'
import Stat from '@/components/Stat.vue'
import TaskList from '@/components/TaskList.vue'
import Task from '@/components/Task.vue'


export default {
  name: 'DashboardView',
  components: {
    Nav,
    Greeting,
    StatsGrid,
    Stat,
    TaskList,
    Task
  }
}
</script>
