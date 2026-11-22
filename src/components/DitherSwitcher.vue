<template lang="pug">
//- Prototype only: rendered when the page is opened with ?dither=, so the
//- placements can be compared on the real panel. Not linked from anywhere.
nav.dither-switcher(aria-label="Dither placement")
  button(
    v-for="option in options"
    :key="option.value"
    type="button"
    :aria-pressed="String(option.value === modelValue)"
    @click="$emit('update:modelValue', option.value)"
  )
    span.num(v-if="option.value") {{ option.value }}
    | {{ option.label }}
</template>

<script setup>
defineProps({
  modelValue: { type: Number, required: true },
})
defineEmits(['update:modelValue'])

const options = [
  { value: 0, label: 'Current' },
  { value: 1, label: 'Edge seam' },
  { value: 2, label: 'Horizon' },
  { value: 3, label: 'Full field' },
  { value: 4, label: 'Header strip' },
]
</script>

<style scoped lang="scss">
.dither-switcher {
  position: fixed;
  // Over the projects column, clear of the bio panel being judged.
  right: 16px;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  z-index: 50;
  display: flex;
  gap: 4px;
  max-width: calc(100vw - 32px);
  overflow-x: auto;
  padding: 4px;
  background: rgba(1, 4, 9, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  button {
    flex: 0 0 auto;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--medium-emphasis-text);
    background: transparent;
    border: 0;
    border-radius: 999px;
    padding: 0.45rem 0.85rem;
    cursor: pointer;
    white-space: nowrap;

    &[aria-pressed='true'] {
      color: var(--white);
      background: rgba(66, 184, 131, 0.22);
      box-shadow: inset 0 0 0 1px var(--green);
    }

    &:focus-visible {
      outline: 2px solid var(--green);
      outline-offset: 2px;
    }
  }

  @media (max-width: 768px) {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  .num {
    margin-right: 0.35rem;
    opacity: 0.6;
    font-variant-numeric: tabular-nums;
  }
}
</style>
