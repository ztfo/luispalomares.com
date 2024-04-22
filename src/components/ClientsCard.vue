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
        background-position: 0 0;
    }
    100% {
        background-position: 100% 0;
    }
}

.client-card {
    display: flex;
    color: #FFF;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border:  none;
    box-shadow: none;
    border-radius: 0;
    background-image: url('https://uploads-ssl.webflow.com/5ce48a38b7568a828f2a0807/66258afe1524d2ef8c97dbf9_clients.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-color: transparent;
    @media screen and (max-width: 768px) {
        background-size: auto;
        background-repeat: repeat-x;
        background-color: transparent;
        animation: scroll 20s linear infinite;
        padding: 1rem;
    }
}
</style>