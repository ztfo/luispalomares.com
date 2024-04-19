<template lang="pug">
.inner-scroll.p-6.coming-soon
    .placeholder-box
        strong 👨🏽‍🚀 Something is in the works. 
        span Stay tuned
        .cursor
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
    display: flex;
    align-items: center;
    justify-content: center;

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
    animation: cursorBlink-61b858bc 1s infinite;
}
</style>