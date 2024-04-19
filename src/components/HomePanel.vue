<template lang="pug">
.inner-bio
    h1.is-size-2.pb-0 Hi, I'm Luis.
    .simple-divider
    p.is-size-5.mb-6
        span I'm a 
        a.link(href="https://www.linkedin.com/in/luis-palomares/", target="_blank") mission-driven leader
        |, who has championed tech initiatives that guard families against wire fraud in real estate, amplify the online presence of lending professionals, and open credit avenues for immigrants, steering startups from 
        a.link(href="https://tucson.com/business/tucson-tech-ua-real-estate-services-startup-wins-major-investment/article_cf74558c-5f18-552b-81a0-cf60679257cf.html", target="_blank") seed 
        | to 
        a.link(href="https://www.businesswire.com/news/home/20230912425188/en/CertifID-Secures-20M-in-Series-B-Funding-to-Protect-Real-Estate-Industry-from-Fraud", target="_blank") series b.
    p.is-size-6.mb-6 
        span 📍In Austin, with my wife 
        a.link(href="https://katieannclay.com", target="_blank") Katie, a Ceramic Artist
        span , and Bing our 🐕.
    .grid
        .cell
            a.button.is-primary.mb-3(href="mailto:hello@builtwithwords.ai", target="_blank") Contact Me
    p.contact-links.is-size-6
        | I like to&nbsp;
        a.link(href="https://dribbble.com/luispalomares", target="_blank") 
            font-awesome-icon(:icon="['fab', 'dribbble']")
            | &nbsp;
            span design
        | &nbsp;and&nbsp;
        a.link(href="https://github.com/ztfo", target="_blank")
            font-awesome-icon(:icon="['fab', 'github']")
            | &nbsp;
            span code
        | .
</template>

<script>
export default {
    name: 'HomePanelComponent',
}
</script>

<style scoped lang="scss">
.link {
    color: var(--white);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: -1px;
        right: -1px;
        height: 1px;
        background-image: linear-gradient(90deg, rgb(66, 184, 131), rgb(62, 113, 250));
        background-size: 200% auto;
        animation: gradient 1.5s infinite linear;
        opacity: .5;
    }
    &:hover {
        &:after {
            opacity: 1;
        }
    }
}

@keyframes gradient {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
}
</style>