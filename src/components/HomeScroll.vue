<template lang="pug">
.inner-scroll.p-6
    h2.is-size-5
        strong Projects
    .line-divider
    .projects
        ProjectCardComponent(
            v-for="project in projects"
            :key="project.title"
            :title="project.title"
            :company="project.company"
            :backgroundImage="project.backgroundImage"
        )
</template>

<script>
import ProjectCardComponent from './ProjectCard.vue';
export default { 
    name: 'HomeScrollComponent',
    components: {
        ProjectCardComponent
    },
    data() {
        return {
            projects: [
                { 
                    title: 'Designing a future without wire fraud.', 
                    company: 'CertifID',
                    backgroundImage: 'https://cdn.dribbble.com/userupload/12298756/file/original-e2d245aa2def188b9ce241dcbc7228f9.jpg?resize=1600x1200'
                },
                { 
                    title: 'Transparent co-marketing in real estate.', 
                    company: 'InHouse',
                    backgroundImage: 'https://cdn.dribbble.com/userupload/9712850/file/original-e7b09bef4ce26ff72f1c908d986bc7ca.png?resize=1024x768'
                },
                { 
                    title: 'The netflix of tortillas.', 
                    company: 'Signal',
                    backgroundImage: 'https://cdn.dribbble.com/userupload/13989986/file/original-b777e279bcaeb0e96828d8e8a55771b0.png?resize=1024x768'
                },                
            ]
        };
    },
    props: {
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    },

};
</script>

<style scoped lang="scss">
@keyframes cursorBlink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
.projects {
    height: 100%;
    overflow: scroll;
}
.inner-scroll {
    background-color: #000;
    width: 100%;
    height: 100vh;
    @media (max-width: 768px) {
        height: auto;
    }
}
.cursor {
    height: 1.15rem;
    width: 1px;
    margin-left: 2px;
    margin-bottom: -3px;
    background-color: #fff;
    display: inline-block;
    animation: cursorBlink 1s infinite;
}
.line-divider {
    width: 2rem;
    height: 1px;
    margin-top: 1rem;
    background: linear-gradient(var(--green), var(--lightblue));
}
</style>