<template lang="pug">
    .client-card.card.p-6
        | 🙏
        .simple-divider.center
        .header.has-text-weight-bold I've been fortunate to work and contract with some amazing companies.
        .is-size-6 I'm working on some write-ups for you. Stay tuned. 
</template>

<script>
export default {
    name: 'ClientsCardComponent',
}
</script>

<style scoped lang="scss">
.client-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border:  none;
    background-color: var(--black);
    box-shadow: none;
    border-radius: 0;
}
</style>