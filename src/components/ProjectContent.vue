<template lang="pug">
.project-content.py-5
    .grid.has-4-cols
        .cell.is-col-span-4
            .project-hero-image.mb-5(:style="{ backgroundImage: 'url(' + project.backgroundImage + ')' }")
        .cell.is-col-span-3
            .project-header.mb-5
                h2.is-size-4.has-text-weight-bold {{ project.company }}
                .simple-divider
        .cell.is-col-span-1.has-text-right
            .metric-block.mb-5
                p.heading Series
                p.title {{ project.series }}
        .cell.is-col-span-4
            .project-overview.mb-5
                    h3.is-size-5.has-text-weight-bold.mb-3 Overview
                    .line-divider
                    p {{ project.overview }}
            .coming-soon 📻 Stay tuned for a complete write-up on {{ project.company }}.
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
    min-height: 16rem;
    background-repeat: no-repeat;
    background-size: cover
}
</style>