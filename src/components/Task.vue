<template lang="pug">
.grid.task.mb-0
    .cell.px-4.py-5 {{ task.date }}
    .cell.px-4.py-5 {{ task.assignedTo }}
    .cell.px-4.py-5 {{ task.assignedBy }}
    .cell.px-4.py-5 {{ task.type }}
</template>

<script>
export default {
    name: 'TaskComponent',
    props: {
        task: {
            type: Object,
            required: true
        }
    },
};
</script>

<style scoped>
.grid.task {
    border-bottom: none;
}
</style>