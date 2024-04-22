<template lang="pug">
.project-content.py-5
    .project-hero-image.mb-5(:style="{ backgroundImage: 'url(' + project.backgroundImage + ')' }")
    .columns.is-mobile
        .column
            .project-header.mb-5
                h2.is-size-4.has-text-weight-bold {{ project.company }}
                .simple-divider
        .column
            .metric-block.mb-5.has-text-right
                // p.heading Series
                // p.title {{ project.series }}
    .project-overview.mb-5
            h3.is-size-5.has-text-weight-bold.mb-3 Overview
            .line-divider
            p.mb-4 {{ project.overview }}
            a.link(:href="project.website" target="_blank")
                font-awesome-icon(icon="link")
                | &nbsp;Website
    .coming-soon 📝 Full write-up in the works.
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
    background-size: cover;
    @media screen and (max-width: 768px) {
        background-position: center;
        width: 100%;
    }
}
</style>