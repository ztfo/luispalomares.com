<template lang="pug">
nav.navbar.p-5(role="navigation", aria-label="main navigation")
    .navbar-brand.signal-brand.mr-3.pr-3
        .navbar-item
            .square-line
                font-awesome-icon(:icon="['fas', 'shekel-sign']", :rotation="90")
            span.brand-name.accent-line SIGNAL
        a.navbar-burger(role="button", aria-label="menu", aria-expanded="false", data-target="navbar")
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
                        .avatar-img
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

<style scoped lang="scss">
.navbar {
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.signal.navbar-brand {
    border: 2px solid #FFFFFF;
}
.square-line {
    position: relative;
    padding: 7px;
    color: #FFF;
    margin-right: .5rem;
    line-height: 1;
    background: var(--gradient-green-blue);
    &::before {
        content: "";
        position: absolute;
        background: var(--black);
        top: 1px;
        bottom: 1px;
        left: 1px;
        right: 1px;
    }
}
.brand-name {
    color: #FFF;
    font-weight: bolder;
    letter-spacing: 1px;
    &.accent-line::before {
        content: "";
        position: absolute;
        bottom: 50%;
        left: 100%;
        width: 20px;
        height: 1px;
        background: var(--gradient-green-blue);
}
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
    margin-right: .5rem;
    background-color: var(--green);
    color: var(--black);
    background-image: url('https://media.licdn.com/dms/image/C5603AQExCh7BU77PlA/profile-displayphoto-shrink_800_800/0/1652627048072?e=1718236800&v=beta&t=QP66LQ3ahJUSj-43F-igIeB0cBoRJGV8RLz063o5jK4');
    background-size: cover;
    background-position: center;
}
.notifications {
    position: relative;
    font-size: 1.25rem;
    &.is-active::before {
        content: "";
        position: absolute;
        top: 7px;
        right: 15px;
        width: 13px;
        height: 13px;
        border-radius: 999px;
        border: 3px solid var(--black);
        background: var(--red);
    }
}
</style>