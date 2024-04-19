<template lang="pug">
router-link.link-block.mt-5(:to="{ path: `/project/${id}` }")
    .card.project(:style="{ backgroundImage: 'url(' + backgroundImage + ')' }")
    .fixed-grid.project-overview.has-6-cols.px-3
        .grid
            .cell.has-text-right
                .project-logo
                    img(:src="logo", alt="Logo" :title="company")
            .cell.is-col-span-5
                .project-title.has-text-right {{ title }}
            .cell.is-col-span-6
                p {{ description }}
</template>

<script>
export default {
    name: 'ProjectCardComponent',
    props: {
        title: String,
        company: String,
        description: String,
        backgroundImage: String,
        logo: String,
        id: String
    },
}
</script>

<style scoped lang="scss">
.card {
    background: #000;
    box-shadow: none;
    border: 2px solid #92929226;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    min-height: 44rem;
    border-radius: 2rem;
    @media (max-width: 768px) {
        min-height: 24rem;
    }
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
.project-logo {
    display: flex;
    justify-content: center;
}
.project-title {
    width: 100%;
}
</style>