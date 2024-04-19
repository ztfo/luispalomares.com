<template lang="pug">
.home
    LogoNavComponent
    .home-panel.left
        HomePanelComponent
    .home-panel.right
        HomeScrollComponent
</template>

<script>
import HomePanelComponent from '@/components/HomePanel.vue';
import HomeScrollComponent from '@/components/HomeScroll.vue';
import LogoNavComponent from '@/components/LogoNav.vue';
export default {
    name: 'HomeView',
    components: {
        HomePanelComponent,
        HomeScrollComponent,
        LogoNavComponent
    }
}
</script>

<style scoped lang="scss">
.home {
    display: flex;
    direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 750px;
    width: 100%;
    background: var(--black);
    color: var(--white);
    .home-panel {
        min-width: 500px;
        width: 40%;
        min-height: 750px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        &.left {
            padding: 5rem;
            background: var(--black);
        }
        &.right {
            width: 60%;
        }
        @media (max-width: 768px) {
            &.right,
            &.left {
                width: 100%;
                height: auto;
                min-height: auto;
            }
        }
    }
    @media (max-width: 768px) {
        height: auto;
        min-height: auto;
        flex-direction: column;
    }
}
</style>