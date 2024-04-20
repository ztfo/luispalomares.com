<template lang="pug">
.project-content.py-5
    .grid.has-4-cols
        .cell.is-col-span-3
            .project-header
                h3.is-size-6.has-text-weight-bold {{ project.company }}
            .project-overview
                h4.is-size-6.has-text-weight-bold Overview
                p {{ project.overview }}
        .cell.is-col-span-1
            .has-text-centered
                p.heading Revenue
                p.title $20M
            .has-text-centered
                p.heading Growth
                p.title 20%
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

</style>