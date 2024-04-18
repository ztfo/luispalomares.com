<template lang="pug">
.home-panel.right
    h1.is-size-2 Hi, I'm Luis
    p.is-size-6.mb-2 I am a creator at the crossroads of design, code, and art. My curiosity and passion have led me to build products that prevent wire fraud in real estate, connect families with trusted real estate professionals, and have propelled startups from seed to Series B. 
    p.is-size-6.mb-5
        strong Want to work together?
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