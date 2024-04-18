<template lang="pug">
.home
    HomePanelComponent
    .home-panel.right
        p projects listed here
</template>

<script>
import HomePanelComponent from '@/components/HomePanel.vue';
export default {
    name: 'HomeView',
    components: {
        HomePanelComponent
    }
}
</script>

<style scoped lang="scss">
.home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 750px;
    width: 100%;
    background: var(--black);
    color: var(--white);
    .home-panel {
        min-width: 500px;
        width: 50vw;
        min-height: 750px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
    }
}
</style>