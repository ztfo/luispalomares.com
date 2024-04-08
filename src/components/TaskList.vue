<template lang="pug">
.task-list.p-6
    .level
        .level-left 
            .level-item
                h1.has-text-dark.accent-line Tasks
        .level-right
            .level-item
                button.button.has-text-white View All 
    .fixed-grid.has-4-cols.mb-0
        .grid.header
            .cell.p-4
                span.sort Date
                font-awesome-icon.is-size-7(icon="angle-down")
            .cell.p-4
                span.sort Assigned To
                font-awesome-icon.is-size-7(icon="angle-down")
            .cell.p-4
                span.sort Assigned By
                font-awesome-icon.is-size-7(icon="angle-down")
            .cell.p-4
                span.sort Type
                font-awesome-icon.is-size-7(icon="angle-down")
    .fixed-grid.has-4-cols.mb-0 
        TaskComponent(v-for="task in tasks" :key="task.id" :task="task")
    .fixed-grid-has-1-cols
        .grid
            nav.pagination.is-small.p-4(role="navigation", aria-label="pagination")
                a.button(href="#", class="pagination-previous") Previous
                a.button(href="#", class="pagination-next") Next page
                ul.pagination-list
                    li
                        a.button(href="#", class="pagination-link", aria-label="Goto page 1") 1
                    li
                        span.pagination-ellipsis &hellip;
                    li
                        a.button(href="#", class="pagination-link", aria-label="Goto page 45") 45
                    li
                        a.button(href="#", class="pagination-link is-current", aria-label="Page 46", aria-current="page") 46
                    li
                        a.button(href="#", class="pagination-link", aria-label="Goto page 47") 47
                    li
                        span.pagination-ellipsis &hellip;
                    li
                        a.button(href="#", class="pagination-link", aria-label="Goto page 86") 86

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
            tasks: [
                { id: 1, date: 'Sunday, April 7, 2024', assignedTo: 'John Doe', assignedBy: 'Finance', type: 'Incoming' },
                { id: 2, date: 'Monday, April 8, 2024', assignedTo: 'Jane Smith', assignedBy: 'Operations', type: 'Outgoing' },
                { id: 3, date: 'Tuesday, April 9, 2024', assignedTo: 'John Doe', assignedBy: 'Finance', type: 'Incoming' },
                { id: 4, date: 'Wednesday, April 10, 2024', assignedTo: 'Jane Smith', assignedBy: 'Operations', type: 'Outgoing' },
                { id: 5, date: 'Thursday, April 11, 2024', assignedTo: 'John Doe', assignedBy: 'Finance', type: 'Incoming' },
                { id: 6, date: 'Friday, April 12, 2024', assignedTo: 'Jane Smith', assignedBy: 'Operations', type: 'Outgoing' },
                { id: 7, date: 'Saturday, April 13, 2024', assignedTo: 'John Doe', assignedBy: 'Finance', type: 'Incoming' },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
.grid {
    border: 1px solid var(--border-color);
    &.header {
        border-bottom: 0;
    }
}
.cell span {
    margin-right: .5rem;
    &.sort {
        cursor: pointer;
        font-weight: bold;
    }
}
.button {
    border-color: var(--border-color);
    color: var(--dark-grey);   
    border-radius: 2px;
    &.is-current {
        background-color: var(--dark-grey);
        border-color: var(--dark-grey);
        color: var(--white);
    }
}
</style>