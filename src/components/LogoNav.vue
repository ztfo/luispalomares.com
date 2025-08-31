<template lang="pug">
.logo-nav.mr-4
    img(
        src="@/assets/graphics/squaregalaxy.svg", 
        alt="Square Galaxy"
        @click="triggerSnakeGame"
        class="clickable-logo"
    )
</template>

<script>
export default {
    name: 'LogoNavComponent',
    emits: ['trigger-snake-game'],
    methods: {
        triggerSnakeGame() {
            this.$emit('trigger-snake-game');
        }
    }
}
</script>

<style scoped lang="scss">
.logo-nav {
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    
    .clickable-logo {
        width: 2.2rem;
        margin-bottom: -3px;
        cursor: pointer;
        transition: transform 0.2s ease, filter 0.2s ease;
        
        &:hover {
            transform: scale(1.1);
            filter: brightness(1.2);
        }
        
        &:active {
            transform: scale(0.95);
        }
    }
}
</style>