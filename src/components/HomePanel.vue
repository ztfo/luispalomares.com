<template lang="pug">
.inner-bio
    h1.is-size-2.pb-0
        LogoNavComponent
        span Hi, I'm Luis.
    p.is-size-5.is-size-6-mobile.my-6
        span A mission-driven 
        a.link(href="https://www.linkedin.com/in/luis-palomares/", target="_blank" @click="trackClick('LinkedIn Profile')")
            span product leader.&nbsp;
            font-awesome-icon.is-size-7.icon.is-small.has-text-grey(icon="arrow-up-right-from-square")
            | &nbsp;
        | &nbsp;I've championed tech initiatives that guard families against wire fraud in real estate, amplify transparency in mortgage lending, and open credit avenues for immigrants, steering startups from 
        a.link(href="https://tucson.com/business/tucson-tech-ua-real-estate-services-startup-wins-major-investment/article_cf74558c-5f18-552b-81a0-cf60679257cf.html", target="_blank" @click="trackClick('Tucson Tech Article')")
            span seed&nbsp;
            font-awesome-icon.is-size-7.icon.is-small.has-text-grey(icon="arrow-up-right-from-square")
            | &nbsp;
        | to 
        a.link(href="https://www.businesswire.com/news/home/20230912425188/en/CertifID-Secures-20M-in-Series-B-Funding-to-Protect-Real-Estate-Industry-from-Fraud", target="_blank" @click="trackClick('CertifID Series B Article')")
            span Series B.&nbsp;
            font-awesome-icon.is-size-7.icon.is-small.has-text-grey(icon="arrow-up-right-from-square")
            | &nbsp;
    p.is-size-6.mb-2
        | Product @&nbsp;
        a.link(href="https://certifid.com", target="_blank" @click="trackClick('CertifID Website')") CertifID
    p.contact-links.is-size-6.mb-6
        | I like to&nbsp;
        a.link(href="https://dribbble.com/luispalomares", target="_blank" @click="trackClick('Dribbble Profile')") 
            font-awesome-icon(:icon="['fab', 'dribbble']")
            | &nbsp;
            span design
        | ,&nbsp;
        a.link(href="https://github.com/ztfo", target="_blank" @click="trackClick('GitHub Profile')") 
            font-awesome-icon(:icon="['fab', 'github']")
            | &nbsp;
            span code
        | ,&nbsp;and&nbsp;
        a.link(href="https://www.foreignsymbols.com", target="_blank" @click="trackClick('Foreign Symbols Website')")
            span make dance music.
    .grid
        .cell
            a.button.is-primary.mb-3(href="mailto:hello@builtwithwords.ai", target="_blank" @click="trackClick('Email Link')") Email Me
</template>

<script>
import SquareWaveComponent from '@/components/Visuals/SquareWave.vue';
import LogoNavComponent from '@/components/LogoNav.vue';
export default {
    name: 'HomePanelComponent',
    components: {
        SquareWaveComponent,
        LogoNavComponent
    },
    data() {
        return {
            imageUrl: 'https://media.licdn.com/dms/image/C5603AQExCh7BU77PlA/profile-displayphoto-shrink_800_800/0/1652627048072?e=1718236800&v=beta&t=QP66LQ3ahJUSj-43F-igIeB0cBoRJGV8RLz063o5jK4'
        };
    },
    methods: {
        trackClick(label) {
            if (window.gtag) {
                window.gtag('event', 'click', {
                    event_category: 'Link',
                    event_label: label,
                    transport_type: 'beacon'
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>