<template lang="pug">
a.link-block.mt-5
    .card.project(:style="{ backgroundImage: 'url(' + backgroundImage + ')' }")
    .fixed-grid.project-overview.has-4-cols
        .grid
            .cell.is-col-span-3
                .project-title.is-size-4 {{ title }}
            .cell.has-text-right
                .project-description.is-size-6 {{ company }}
</template>

<script>
export default {
    name: 'ProjectCardComponent',
    props: {
        title: String,
        company: String,
        backgroundImage: String
    },
}
</script>

<style scoped lang="scss">
.card {
    background: #000;
    box-shadow: none;
    border: 2px solid#92929226;
    background-size: cover;
    background-position: center;
    min-height: 24rem;
    border-radius: 2rem;
}
.link-block {
    display: block;
    text-decoration: none;
    color: inherit;
    margin-bottom: 7rem;
}
.cell {
    display: flex;
    align-items: center;
    &.has-text-right {
        justify-content: flex-end;
    }
}
</style>