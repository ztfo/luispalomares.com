<template lang="pug">
.inner-scroll.p-6
    h2.is-size-5
        strong Projects
    .line-divider
    .projects
        .card.project.mt-6
</template>

<script>
export default { 
    name: 'HomeScrollComponent',
    data() {
        return {
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