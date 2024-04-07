<template lang="pug">
.stats-grid.p-6
    .level
        .level-left 
            .level-item
                h1 Status
        .level-right
            .level-item
                .dropdown
                    .dropdown-trigger
                        button.button(aria-haspopup="true", aria-controls="dropdown-menu")
                            span Date
                            font-awesome-icon(icon="angle-down")
                    .dropdown-menu#dropdown-menu(role="menu")
                        .dropdown-content
                            a(href="#").dropdown-item Dropdown item
                            a.dropdown-item Other dropdown item
                            a(href="#").dropdown-item.is-active Active dropdown item
                            a(href="#").dropdown-item Other dropdown item
                            hr.dropdown-divider
                            a(href="#").dropdown-item With a divider
    .columns
        .column
            StatComponent
        .column
            StatComponent
        .column
            StatComponent
        .column
            StatComponent
</template>

<script>
import StatComponent from './Stat.vue';
export default {
    name: 'StatsGridComponent',
    components: {
        StatComponent
    },
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
};
</script>

<style scoped>

</style>