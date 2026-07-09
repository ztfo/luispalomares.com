<template lang="pug">
.home
  .home-panel.left
    .long-divider
    HomePanel
    Footer
  .home-panel.right
    .inner-scroll
      slot
</template>

<script setup>
import HomePanel from '@/components/HomePanel.vue'
import Footer from '@/components/Footer.vue'
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
            &.left {
                padding-bottom: 2.5rem;
            }
            .long-divider {
                margin-bottom: 4rem;
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
  height: 4px;
  border-radius: 1px;
  background: linear-gradient(270deg, var(--green), var(--lightblue), var(--green));
  background-size: 200% 200%;
  animation: gradient 3s ease-in-out infinite;
}
.inner-scroll {
    background-color: #000;
    width: 100%;
    height: 100vh;
    padding: 3rem 5rem;
    overflow-y: scroll;
    @media (max-width: 768px) {
        height: auto;
        padding-top: 2.5rem;
    }
}
</style>
