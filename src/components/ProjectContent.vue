<template lang="pug">
.project-content.py-5
    .grid.has-4-cols
        .cell.is-col-span-4
            .project-hero-image.mb-5
        .cell.is-col-span-3
            .project-header.mb-5
                h2.is-size-4.has-text-weight-bold {{ project.company }}
                .simple-divider
            .project-overview.mb-5
                h3.is-size-5.has-text-weight-bold.mb-3 Overview
                .line-divider
                p {{ project.overview }}
        .cell.is-col-span-1.is-row-span-2.has-text-right
            .metric-block.mb-5
                p.heading Series
                p.title {{ project.series }}
            .metric-block.mb-5
                p.heading Revenue
                p.title {{ project.revenue }}
            .team-block
                p.heading.has-text-weight-bold Team
                p(v-for="(member, index) in project.team" :key="index") {{ member }}
        .cell.is-col-span-3
            h3.is-size-5.heading.has-text-weight-bold.mb-3 Story
            p.mb-5 {{ project.story }}
    .project-component
        component(:is="project.companyComponent")
</template>

<script>
export default {
    name: 'ProjectContentComponent',
    props: {
        project: Object,
    },
    computed: {
        projectComponent() {
            return () => import(`./Projects/${this.currentProject.company}.vue`);
        },
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