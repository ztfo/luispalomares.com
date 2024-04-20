<template lang="pug">
.project-content.py-5
    .grid.has-4-cols
        .cell.is-col-span-4
            .project-hero-image.mb-5
        .cell.is-col-span-3
            .project-header.mb-5
                h2.is-size-4.has-text-weight-bold {{ project.company }}
            .project-overview
                h4.is-size-6.has-text-weight-bold Overview
                p {{ project.overview }}
        .cell.is-col-span-1.has-text-right
            .metric-block.mb-5
                p.heading Revenue
                p.title $20M
            .metric-block.mb-5
                p.heading Growth
                p.title 20%
            .team-block
                p.heading Team
                p(v-for="(member, index) in project.team" :key="index") {{ member }}
    .timeline
        .timeline-item
            .timeline-marker
            .timeline-content
</template>

<script>
export default {
    name: 'ProjectContentComponent',
    props: {
        project: Object,
    },
}
</script>

<style lang="scss">
.project-hero-image {
    min-height: 22rem;
    border: 1px solid var(--glass);
    border-radius: 1.5rem
}
</style>