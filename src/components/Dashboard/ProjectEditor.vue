<template lang="pug">
.project-editor.p-6
  h1.has-text-white.accent-line Projects
  .coming-soon.has-text-centered.mt-6
    p Project editor coming soon...
</template>

<script>
export default {
  name: 'ProjectEditor'
}
</script>

<style lang="scss" scoped>
.project-editor {
  min-height: calc(100vh - 80px);
}

.coming-soon {
  color: var(--medium-emphasis-text);
}

.accent-line {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2rem;
    height: 1px;
    background: linear-gradient(var(--green), var(--lightblue));
  }
}
</style> 