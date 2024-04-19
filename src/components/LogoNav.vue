<template lang="pug">
.logo-nav
    .square
        .accent-lines(v-for="j in 5" :key="'lines-' + j")
            span(v-for="i in 2000" :key="'line-' + i")
</template>

<script>
export default {
    name: 'LogoNavComponent',
}
</script>

<style scoped lang="scss">
.logo-nav {
    display: none; // for now until I come up with how to animate this. 
}
.square {
    position: relative;
    width: 500px;
    height: 500px;
    opacity: .1;
}

.accent-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    span {
        position: absolute;
        width: 100%;
        height: .5px;
        background-image: linear-gradient(to right, var(--green), var(--lightblue));
        background-size: 100% 100%;

        @for $i from 1 through 2000 {
            &:nth-child(#{$i}) {
                top: #{5px * $i};
                transform: rotate(#{2deg * $i});
            }
        }
    }
}
</style>