<template lang="pug">
.project(v-if="project")
    .project-detail.pb-2.columns.is-mobile
        .project-title.column.is-half-mobile.is-four-fifths-desktop
            router-link.square-link(to="/")
                font-awesome-icon(icon="angle-left")
            h2.is-size-6.pb-4
                SquareWaveComponent
                br
                span.is-hidden-mobile {{ project.title }}
        .project-logo.column.is-half-mobile
            img(:src="project.logo", alt="Logo" :title="project.company")
    ProjectContentComponent(v-if="project", :project="project")
</template>

<script>
import SquareWaveComponent from '@/components/Visuals/SquareWave.vue';
import ProjectContentComponent from './ProjectContent.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'ProjectDetail',
    components: {
        SquareWaveComponent,
        ProjectContentComponent
    },
    data() {
        return {
            project: null,
        };
    },
    computed: {
        ...mapGetters(['getProject']),
    },
    methods: {
        fetchProject() {
            const projectId = this.$route.params.id;
            this.project = this.getProject(projectId);
        },
    },
    watch: {
        $route() {
            this.fetchProject();
        },
    },
    created() {
        this.fetchProject();
    },
}
</script>

<style scoped lang="scss">
.project-detail {
    position: relative;
    &::after {
        content: '';
        display: block;
        height: 1px;
        background-color: var(--glass);
        position: absolute;
        bottom: 0;
        right: .75rem;
        left: .75rem;
    }    
}
.project-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 768px) {
    }    
}
.square-link {
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    border: 1px solid var(--lightblue);
    font-size: 1.1rem;
    color: var(--white);
    margin-top: -.6rem;
    margin-right: 1rem;
    transition: .5s;
    &:hover {
        background-color: var(--lightblue);
    }
}
.project-logo {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
        max-width: 9.5rem;
    }
}
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>