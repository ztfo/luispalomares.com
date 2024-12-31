<template lang="pug">
.dashboard-container
  Nav
  .columns
    .column.is-2.sidebar
      .menu
        p.menu-label Content
        ul.menu-list
          li
            router-link(to="/editor/projects") Projects
          li
            router-link(to="/editor/articles") Articles
    .column.is-10.main-content
      router-view
</template>

<script>
import Nav from '../Nav.vue';

export default {
  name: 'EditorDashboard',
  components: {
    Nav
  },
  created() {
    if (!localStorage.getItem('editor_access')) {
      window.location.href = '/editor-access.html';
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100vh;
  background: var(--black);
}

.sidebar {
  background: var(--thin-glass);
  padding: 2rem;
  min-height: calc(100vh - 80px);
}

.menu-label {
  color: var(--white);
  font-weight: bold;
}

.menu-list {
  a {
    color: var(--medium-emphasis-text);
    &.is-active {
      background: var(--lightblue);
    }
  }
}
</style> 