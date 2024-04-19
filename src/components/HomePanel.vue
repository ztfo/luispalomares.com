<template lang="pug">
.inner-bio
    img.mb-4(src="@/assets/graphics/squareswirl.svg", alt="Square Swirl Icon")
    h1.is-size-2.pb-0 Hi, I'm Luis.
    .simple-divider
    p.is-size-5.mb-6
        span A 
        a.link(href="https://www.linkedin.com/in/luis-palomares/", target="_blank") mission-driven product leader
        |, who has championed tech initiatives that guard families against wire fraud in real estate, amplify transparency in home lending, and open credit avenues for immigrants, steering startups from 
        a.link(href="https://tucson.com/business/tucson-tech-ua-real-estate-services-startup-wins-major-investment/article_cf74558c-5f18-552b-81a0-cf60679257cf.html", target="_blank") seed 
        | to 
        a.link(href="https://www.businesswire.com/news/home/20230912425188/en/CertifID-Secures-20M-in-Series-B-Funding-to-Protect-Real-Estate-Industry-from-Fraud", target="_blank") Series B.
    p.is-size-6.mb-6
        span 📍In Austin, with my wife 
        a.link(href="https://katieannclay.com", target="_blank") Katie, a Ceramic Artist
        span , and Bing our 🐕.
    p.contact-links.is-size-6.mb-6
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
    .grid
        .cell
            a.button.is-primary.mb-3(href="mailto:hello@builtwithwords.ai", target="_blank") Email Me
</template>

<script>
export default {
    name: 'HomePanelComponent',
    data() {
        return {
            imageUrl: 'https://media.licdn.com/dms/image/C5603AQExCh7BU77PlA/profile-displayphoto-shrink_800_800/0/1652627048072?e=1718236800&v=beta&t=QP66LQ3ahJUSj-43F-igIeB0cBoRJGV8RLz063o5jK4'
        };
    },
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
        left: 0px;
        right: 0px;
        height: 1px;
        border-radius: 999px;
        background-image: linear-gradient(90deg, rgb(66, 184, 131), rgb(62, 113, 250));
        background-size: 200% auto;
        animation: gradient 2s infinite linear;
        opacity: .8;
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