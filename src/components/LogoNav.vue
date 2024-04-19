<template lang="pug">
.logo-nav.mr-4
    img(src="@/assets/graphics/squaregalaxy.svg", alt="Square Galaxy")
</template>

<script>
export default {
    name: 'LogoNavComponent',
}
</script>

<style scoped lang="scss">
.logo-nav {
    display: inline-block;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    img {
        width: 2.2rem;
        margin-bottom: -3px;
    }
}
</style>