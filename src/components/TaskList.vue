<template lang="pug">
.task-list.p-6
    .level
        .level-left 
            .level-item
                h1 Tasks
        .level-right
            .level-item
                button.button View All 
    .fixed-grid.has-4-cols
        .grid
            .cell.header
                span Date
            .cell.header
                span Assigned To
            .cell.header
                span Assigned By
            .cell.header
                span Type
    .fixed-grid.has-1-cols 
        .grid
            TaskComponent
</template>

<script>
import TaskComponent from './Task.vue';

export default {
    name: 'TaskList',
    components: {
        TaskComponent
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