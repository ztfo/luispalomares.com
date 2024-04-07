<template lang="pug">
nav.navbar(role="navigation", aria-label="main navigation")
    .navbar-brand
        a.navbar-item(href="/")
            span signal
        a.navbar-burger(role="button", aria-label="menu", aria-expanded="false", data-target="navbarBasicExample")
            span(aria-hidden="true")
            span(aria-hidden="true")
            span(aria-hidden="true")
            span(aria-hidden="true")
    #navbar.navbar-menu
        .navbar-start
            a.navbar-item Overview
            a.navbar-item Ledger
            a.navbar-item Payments
            a.navbar-item Insights
        .navbar-end
            .navbar-item
                .buttons
                a.button.search
                    font-awesome-icon(icon="search")
                a.button.notifications
                    font-awesome-icon(icon="bell")
                a.button.avatar
                    .avatar-img z
                    .avatar-name 
                        span ztfo
                        font-awesome-icon(icon="caret-down")

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