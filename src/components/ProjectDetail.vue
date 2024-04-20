<template lang="pug">
.project-detail.pb-2(v-if="project")
    .project-title
        router-link.square-link(to="/")
            font-awesome-icon(icon="angle-left")
        h2.is-size-6.pb-4
            SquareWaveComponent
            br
            strong {{ project.company }} |
            span &nbsp;{{ project.title }}
    .project-logo(v-if="project.logo")
        img(:src="project.logo", alt="Logo" :title="project.company")
</template>

<script>
import SquareWaveComponent from '@/components/Visuals/SquareWave.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectDetail',
  components: {
    SquareWaveComponent,
  },
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
.project-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--glass);
}
.project-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.square-link {
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid var(--lightblue);
    font-size: 1.2rem;
    color: var(--white);
    margin-top: -.6rem;
    margin-right: 1rem;
    transition: .5s;
    &:hover {
        background-color: var(--lightblue);
    }
}
.project-logo img {
    max-width: 9.5rem;
}
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>