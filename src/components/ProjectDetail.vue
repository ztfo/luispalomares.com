<template lang="pug">
.project-detail(v-if="project")
    router-link(to="/") Back
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectDetail',
  data() {
    return {
      project: null,
    };
  },
  computed: {
    ...mapGetters(['getProject']),
  },
  watch: {
    $route() {
      this.fetchProject();
    },
  },
  created() {
    this.fetchProject();
  },
  methods: {
    fetchProject() {
      const id = this.$route.params.id;
      this.project = this.getProject(id);
    },
  },
};
</script>

<style scoped lang="scss">
</style>