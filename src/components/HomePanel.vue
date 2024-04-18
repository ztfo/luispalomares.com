<template lang="pug">
.home-panel.right
    h1.is-size-2 Hi, I'm Luis
    p.is-size-6.mb-5 A multi-disciplinary technologist and entrepreneur. Check out my projects to learn how I blend art, design, code, and business.  
    .grid
        .cell
            a.button.is-primary.mb-3 Get in touch
</template>

<script>
export default {
    name: 'HomePanelComponent',
}
</script>

<style scoped lang="scss">
.home-panel.right {
    padding: 5rem;
}
</style>