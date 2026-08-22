<template lang="pug">
.project(v-if="project")
    .project-detail.pb-2.columns.is-mobile
        ShaderCanvas.detail-shader(effect="stream-convergence" :opacity="0.28" :speed="0.5" :brightness="0.8")
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
import ShaderCanvas from '@/components/Visuals/ShaderCanvas.vue';
import ProjectContentComponent from './ProjectContent.vue';
import { trackProjectEvent, trackTimeSpent } from '@/utils/analytics';

export default {
    name: 'ProjectDetail',
    components: {
        SquareWaveComponent,
        ShaderCanvas,
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
// Masked to hug the hairline divider under the header, so the effect reads as
// a lit underline rather than a panel behind the title and logo.
.detail-shader {
    z-index: 0;
    --detail-shader-mask: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0.28) 30%, transparent 55%);
    -webkit-mask-image: var(--detail-shader-mask);
    mask-image: var(--detail-shader-mask);
}
.project-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 1;
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
    position: relative;
    z-index: 1;
    img {
        width: 100%;
    }
}
</style>