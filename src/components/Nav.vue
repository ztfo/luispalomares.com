<template lang="pug">
nav.navbar(role="navigation", aria-label="main navigation")
    .navbar-brand
        a.navbar-item(href="/")
            a.navbar-burger(role="button", aria-label="menu", aria-expanded="false", data-target="navbarBasicExample")
            span(aria-hidden="true")
            span(aria-hidden="true")
            span(aria-hidden="true")
            span(aria-hidden="true")
    #navbar.navbar-menu
        .navbar-start
            a.navbar-item Overview
            a.navbar-item Ledgers
            a.navbar-item Payments
            a.navbar-item Operations
            a.navbar-item Insights
            a.navbar-item Connectors
        .navbar-end
            a.navbar-item Payments
            .navbar-item
                .buttons
                a.button.is-primary
                    strong Sign up
                a.button.is-light Log in
</template>

<script>
export default {
    name: 'NavComponent',
    data() {
        return {

        };
    },
    methods: {

    },
    computed: {

    },
    props: {

    },
    components: {

    },
};
</script>

<style scoped>

</style>