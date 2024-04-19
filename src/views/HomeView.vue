<template lang="pug">
.home
    .home-panel.left
        .long-divider
        HomePanelComponent
        FooterComponent
    .home-panel.right
        HomeScrollComponent
</template>

<script>
import HomePanelComponent from '@/components/HomePanel.vue';
import HomeScrollComponent from '@/components/Projects.vue';
import LogoNavComponent from '@/components/LogoNav.vue';
import FooterComponent from '@/components/Footer.vue';
export default {
    name: 'HomeView',
    components: {
        HomePanelComponent,
        HomeScrollComponent,
        LogoNavComponent,
        FooterComponent
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
            padding: 3rem 5rem;
            background: var(--black);
            justify-content: space-between;
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
.long-divider {
    width: 100%;
    height: 1px;
    background: var(--gradient-green-blue);
}
</style>