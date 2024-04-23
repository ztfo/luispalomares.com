<template lang="pug">
    .client-card.card.p-6.has-text-centered
        .is-size-3 📻
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
@keyframes scroll {
    0% {
        background-position: 0;
    }
    100% {
        background-position: 100%;
    }
}

.client-card {
    display: flex;
    color: #FFF;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
    border: 1px solid var(--glass);
    background-image: url('https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/6625daec7847404b7802a821_clients.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    @media screen and (max-width: 768px) {
        background-size: cover;
        background-repeat: repeat-x;
        background-color: transparent;
        animation: scroll 30s linear infinite;
    }
}
</style>