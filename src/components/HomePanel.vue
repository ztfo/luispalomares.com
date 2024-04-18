<template lang="pug">
.home-panel.left
    h1.is-size-2.pb-0 Hi, I'm Luis.
    .simple-divider
    p.is-size-6.mb-6 A multi-disciplinary creative with a passion for building. My curiosity and passion have led me to build products that prevent wire fraud in real estate, connect families with trusted real estate professionals, and have propelled startups from seed to Series B. 
    p.is-size-6.mb-6 📍Based in Austin, I enjoy life with my wife Katie, and our dog Bing.
    .grid
        .cell
            a.button.is-primary.mb-3(href="mailto:hello@builtwithwords.ai", target="_blank") Contact Me
</template>

<script>
export default {
    name: 'HomePanelComponent',
}
</script>

<style scoped lang="scss">
.home-panel.left {
    padding: 5rem;
    background: var(--black);
}
.link {
    color: var(--white);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
</style>