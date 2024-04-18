<template lang="pug">
.stats-grid.p-6
    .level
        .level-left 
            .level-item
                h1.accent-line Overview
        .level-right
            .level-item
                .dropdown.is-right(:class="{ 'is-active': dropdownIsActive }")
                    .dropdown-trigger
                        button.button(@click="toggleDropdown" aria-haspopup="true", aria-controls="dropdown-menu")
                            span Date
                            font-awesome-icon(icon="angle-down")
                    .dropdown-menu#dropdown-menu(role="menu")
                        .dropdown-content
                            .calendar
                                span TO DO: Calendar
                            a.dropdown-item Ok
    .columns.pb-3
        .column
            StatComponent(v-if="stats[0] && stats[0].icon" v-bind="stats[0]" :iconColor="stats[0].color")
        .column
            StatComponent(v-if="stats[1] && stats[1].icon" v-bind="stats[1]" :iconColor="stats[1].color")
        .column
            StatComponent(v-if="stats[2] && stats[2].icon" v-bind="stats[2]" :iconColor="stats[2].color")
        .column
            StatComponent(v-if="stats[3] && stats[3].icon" v-bind="stats[3]" :iconColor="stats[3].color")
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
            dropdownIsActive: false,
            stats: [
                { icon: 'money-bill-transfer', label: 'Transaction Volume', amount: '$745,457.11', growth: '+26%', color: '#00EDAE' },
                { icon: 'comments-dollar', label: 'Reversals', amount: '-$12,112.75', growth: '-12%', color: '#B4E4C9' },
                { icon: 'umbrella', label: 'Insured Transfers', amount: '68.3%', growth: '+3%', color: '#B1DAFF' },
                { icon: 'skull-crossbones', label: 'Loss Events', amount: '2', growth: '-7%', color: '#FE8D7E' }
            ]
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownIsActive = !this.dropdownIsActive;
        }
    },
};
</script>