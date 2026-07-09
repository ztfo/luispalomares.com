<template lang="pug">
.error-page
  .error-content
    .long-divider
    h1.is-size-1.mt-5.mb-2 {{ error?.statusCode || 'Error' }}
    p.is-size-5.mb-5 {{ message }}
    button.button.is-primary(@click="handleClear") Back home
</template>

<script setup>
const props = defineProps({
  error: { type: Object, default: null },
})

const message = computed(() =>
  props.error?.statusCode === 404
    ? "This page doesn't exist."
    : 'Something went wrong.',
)

useSeoMeta({
  title: `${props.error?.statusCode || 'Error'} — Luis Palomares`,
  robots: 'noindex',
})

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 3rem;
  background: var(--black);
  color: var(--white);
  text-align: center;
}
.error-content {
  max-width: 30rem;
}
.long-divider {
  width: 100%;
  height: 4px;
  border-radius: 1px;
  background: linear-gradient(270deg, var(--green), var(--lightblue), var(--green));
  background-size: 200% 200%;
  animation: gradient 3s ease-in-out infinite;
}
h1 {
  color: var(--white);
  font-weight: 700;
}
</style>
