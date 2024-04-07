<template lang="pug">
nav.navbar.p-5(role="navigation", aria-label="main navigation")
    .navbar-brand.signal-brand
        a.navbar-item(href="/")
            .square-line
                font-awesome-icon(:icon="['fas', 'shekel-sign']", :rotation="90")
            span.brand-name SIGNAL
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
                .account.buttons
                    a.button.search
                        font-awesome-icon(icon="search")
                    a.button.notifications.is-active
                        font-awesome-icon(icon="bell")
                    a.button.avatar
                        .avatar-name 
                            span ztfo
                        .avatar-img
                            font-awesome-icon(icon="user-astronaut")

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
.navbar {
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.signal.navbar-brand {
    border: 2px solid #FFFFFF;
}
.square-line {
      border: 2px solid #FFFFFF;
      padding: 5px;
      color: #FFF;
      margin-right: .5rem;
      line-height: 1;
}
.brand-name {
    color: #FFF;
    font-weight: bolder;
    letter-spacing: 1px;
}
.account .button {
    border: none;
    outline: none;
    background: transparent;
}
.avatar-img {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 999px;
    margin-left: .5rem;
    background-color: var(--green);
    color: var(--black);
}
</style>