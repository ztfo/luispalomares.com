<template lang="pug">
.project-content.py-5
    .project-hero-image.mb-5(v-if="project.backgroundImage" :style="{ backgroundImage: 'url(' + project.backgroundImage + ')' }")
    .columns.is-mobile
        .column
            .project-header.mb-5
                h2.is-size-4.has-text-weight-bold {{ project.company }}
                .simple-divider
        .column
            .metric-block.mb-5.has-text-right
                p.heading {{ project.role }}
                p.title {{ project.stage }}
                p.subtitle {{ project.timeline }}
    .project-stats.mb-5(v-if="project.stats")
        .stat(v-for="stat in project.stats" :key="stat.label")
            p.stat-value {{ stat.value }}
            p.stat-label {{ stat.label }}
    .project-overview.mb-5
            h3.is-size-5.has-text-weight-bold.mb-3 Overview
            .line-divider
            p {{ project.overview }}
    .project-wins.mb-5(v-if="project.wins")
            h3.is-size-5.has-text-weight-bold.mb-3 {{ project.projectType === 'main' ? 'Key wins' : 'Highlights' }}
            .line-divider
            ul
                li(v-for="win in project.wins" :key="win") {{ win }}
    .project-links(v-if="project.links")
        a.link(v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" @click="trackLinkClick(link)")
            font-awesome-icon(icon="link")
            | &nbsp;{{ link.label }}
</template>

<script>
import { trackProjectEvent } from '@/utils/analytics';

export default {
    name: 'ProjectContentComponent',
    props: {
        project: Object,
    },
    methods: {
        trackLinkClick(link) {
            trackProjectEvent('website_click', this.project, {
                website_url: link.url,
                link_label: link.label,
                click_location: 'project_content',
                event_label: this.project.company
            });
        }
    }
}
</script>

<style lang="scss">
.project-hero-image {
    min-height: 16rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
}

// One column per stat, however many there are, so a quest with a single
// number doesn't leave two empty cells beside it.
.project-stats {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    border-top: 1px solid var(--glass);
    border-bottom: 1px solid var(--glass);

    .stat {
        padding: 1.25rem 1rem 1.25rem 0;

        & + .stat {
            padding-left: 1rem;
            border-left: 1px solid var(--glass);
        }
    }

    .stat-value {
        color: var(--white);
        font-size: 1.75rem;
        font-weight: 700;
        line-height: 1.1;
        @media screen and (max-width: 768px) {
            font-size: 1.35rem;
        }
    }

    .stat-label {
        font-size: 0.85rem;
        margin-top: 0.35rem;
    }
}

.project-wins li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.6rem;
    color: var(--medium-emphasis-text);

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.75em;
        width: 0.5rem;
        height: 1px;
        background: var(--gradient-green-blue);
    }
}

.project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
}
</style>
