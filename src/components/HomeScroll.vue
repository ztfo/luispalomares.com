<template lang="pug">
.inner-scroll
    .project-card
        .project-graphic
        h2 Project Title
        p Project Description
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
.inner-scroll {
    background-color: #000;
    width: 100%;
    height: 100vh;
}
</style>