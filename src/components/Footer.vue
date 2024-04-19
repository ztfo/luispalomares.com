<template lang="pug">
p.is-size-6.mt-6
    span 📍I live in Austin with my wife&nbsp;
    a.link(href="https://katieannclay.com", target="_blank") Katie, a Ceramic Artist
    span &nbsp;&amp; our 🐕 Bingley.
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

<style scoped>
@media (max-width: 768px) {
    p {
        font-size: 0.8rem !important;
    }
}
</style>