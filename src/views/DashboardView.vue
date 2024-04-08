<template lang="pug">
.dashboard
  .overview
    .container
      GreetingComponent
      StatsGridComponent
  .container
    TaskList
  footer.footer.pb-6
    .container
      .level.is-size-7.is-uppercase.px-6.py-0
        .level-left
          .level-item
            p.has-text-white &copy; All rights reserved.
        .level-right
          .level-item
            p.has-text-white Made with Curiosity 👨🏽‍🚀 
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

<style scoped>
.overview {
  background: var(--black);
}
.footer {
  background: var(--black);
  color: var(--white);
  letter-spacing: 1px;
  font-weight: 500;
}
</style>