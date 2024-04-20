<template lang="pug">
.inner-scroll
    .projects-container(v-if="!isProjectRoute")
        SquareWaveComponent
        h2.is-size-5.pb-4
            strong Projects
        .projects
            ProjectCardComponent(
                v-for="project in projects"
                :key="project.id"
                :project="project"
            )
    .projects-detail-container(v-else)
        router-view
</template>

<script>
import store from '../store';
import ProjectCardComponent from './ProjectCard.vue';
import SquareWaveComponent from '@/components/Visuals/SquareWave.vue';
export default { 
    name: 'ProjectsComponent',
    components: {
        ProjectCardComponent,
        SquareWaveComponent
    },
    data() {
        return {
            isProjectRoute: this.$route.name === 'project',
        };
    },
    computed: {
        projects() {
            return store.state.projects;
        },
    },
    watch: {
        $route() {
            this.isProjectRoute = this.$route.name === 'project';
            console.log('isProjectRoute:', this.isProjectRoute);
        },
    },
}
</script>

<style scoped lang="scss">
@keyframes cursorBlink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
.projects-container {
    height: 100%;
}
.projects {
    height: 100%;
    overflow: scroll;
}
.inner-scroll {
    background-color: #000;
    width: 100%;
    height: 100vh;
    padding: 3rem 5rem;
    @media (max-width: 768px) {
        height: auto;
        padding-top: 2.5rem;
    }
}
.cursor {
    height: 1.15rem;
    width: 1px;
    margin-left: 2px;
    margin-bottom: -3px;
    background-color: #fff;
    display: inline-block;
    animation: cursorBlink 1s infinite;
}
.line-divider {
    width: 2rem;
    height: 1px;
    margin-top: 1rem;
    background: linear-gradient(var(--green), var(--lightblue));
}
.coming-soon {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>