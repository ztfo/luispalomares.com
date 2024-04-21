<template lang="pug">
    .client-card.card.p-6
        .is-size-3 🙏
        .simple-divider.center
        .header.has-text-weight-bold I've been fortunate to work and contract with some amazing companies.
        .is-size-6 Stay tuned.
</template>

<script>
export default {
    name: 'ClientsCardComponent',
}
</script>

<style scoped lang="scss">
.client-card {
    display: flex;
    color: #FFF;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border:  none;
    box-shadow: none;
    border-radius: 0;
    background-image: url('https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/66258b4b0b9b87d27e33f70c_clients.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent
}
</style>