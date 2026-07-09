<template lang="pug">
#app
  NuxtLayout
    NuxtPage
</template>

<script setup>
// Pages set their own full titles; this only supplies a default for routes
// that don't (e.g. the error page).
useHead({
  titleTemplate: (title) =>
    title || 'Luis Palomares — Product Leader, Designer & Founder',
})
</script>
