<template lang="pug">
.project(v-if="project")
    .project-detail.pb-2.columns.is-mobile
        .project-title.column.is-half-mobile.is-four-fifths-desktop
            NuxtLink.square-link(to="/" @click="handleBackNavigation")
                font-awesome-icon(icon="angle-left")
            h2.is-size-6.pb-4.is-hidden-mobile
                SquareWaveComponent
                br
                span {{ project.title }}
        .project-logo.column.is-half-mobile
            img(:src="project.logo", :alt="`${project.company} logo`" :title="project.company")
    ProjectContentComponent(v-if="project", :project="project")
</template>

<script>
import SquareWaveComponent from '@/components/Visuals/SquareWave.vue';
import ProjectContentComponent from './ProjectContent.vue';
import { trackProjectEvent, trackTimeSpent } from '@/utils/analytics';

export default {
    name: 'ProjectDetail',
    components: {
        SquareWaveComponent,
        ProjectContentComponent
    },
    props: {
        // Resolved on the server by the page and passed in, so the detail
        // renders in the prerendered HTML (crawlable, no client fetch needed).
        project: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            pageLoadTime: null,
        };
    },
    methods: {
        handleBackNavigation() {
            // Track back navigation using utility function (client only)
            if (import.meta.client && this.project && this.pageLoadTime) {
                const timeSpent = Date.now() - this.pageLoadTime;

                trackTimeSpent(timeSpent, {
                    event_label: 'back_to_home',
                    from_project: this.project.company,
                    project_id: this.project.id,
                    navigation_type: 'back_button'
                });
            }

            this.scrollToTop();
        },
        scrollToTop() {
            if (!import.meta.client) return;
            this.$nextTick(() => {
                window.scrollTo(0, 0);
            });
        },
    },
    mounted() {
        // Runs client-side only, so window/analytics access is safe here.
        this.pageLoadTime = Date.now();

        if (this.project) {
            trackProjectEvent('project_view', this.project, {
                page_location: window.location.href,
                timestamp: this.pageLoadTime
            });
        }
    },
    beforeUnmount() {
        // Track time spent on project page when leaving using utility function
        if (import.meta.client && this.project && this.pageLoadTime) {
            const timeSpent = Date.now() - this.pageLoadTime;

            trackTimeSpent(timeSpent, {
                event_label: this.project.company,
                project_id: this.project.id,
                project_company: this.project.company,
                exit_page: window.location.href
            });
        }
    }
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
        width: 100%;
    }
}
.project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>