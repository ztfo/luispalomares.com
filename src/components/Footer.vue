<template lang="pug">
p.mt-6
    span 📍I live in Austin with my wife&nbsp;
    a.link(href="https://katieannclay.com", target="_blank" @click="trackFooterLink") Katie, a Ceramic Artist
    span &nbsp;&amp; our 🐕 Bingley.
</template>

<script>
import { trackExternalLink } from '@/utils/analytics';

export default {
    name: 'FooterComponent',
    methods: {
        trackFooterLink() {
            trackExternalLink({
                url: 'https://katieannclay.com',
                label: 'Katie Clay Website',
                linkType: 'personal',
                location: 'footer'
            });
        }
    }
}
</script>

<style scoped>
p {
    font-size: .9rem;
}
</style>