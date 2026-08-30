<template lang="pug">
.home(:class="{ 'detail-first': detailOpen }")
  .home-panel.left
    ShaderCanvas.panel-shader(effect="ribbon-field" :opacity="0.55")
    .panel-scrim
    .panel-content
      .long-divider
      HomePanel
      Footer.rise(style="--rise-index: 6")
  .home-panel.right
    .inner-scroll(ref="innerScroll")
      slot
</template>

<script setup>
import HomePanel from '@/components/HomePanel.vue'
import Footer from '@/components/Footer.vue'
import ShaderCanvas from '@/components/Visuals/ShaderCanvas.vue'

const route = useRoute()

// On mobile the panels stack bio-first, so opening a quest used to render the
// detail a full screen below the fold: the tap looked like it did nothing.
// Ordering the right panel first on a project route puts the detail where the
// tap was, and returning to "/" restores the bio-first order.
const detailOpen = computed(() => route.path.startsWith('/project'))

// The projects column is its own scroll container on desktop, and its scroll
// position survives a route change (the element belongs to the layout, not the
// page). Without this, opening a quest from halfway down the list renders the
// detail already scrolled past its own header.
const innerScroll = ref(null)
watch(
  () => route.path,
  () => innerScroll.value?.scrollTo({ top: 0 }),
)
</script>

<style scoped lang="scss">
.home {
    display: flex;
    direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
    min-height: 750px;
    width: 100%;
    background: var(--black);
    color: var(--white);
    .home-panel {
        min-width: 500px;
        width: 40%;
        min-height: 750px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        &.left {
            padding: 3rem 5rem;
            background: var(--black);
            justify-content: space-between;
            // Containing block for the shader and scrim (both inset: 0).
            // Do NOT add `isolation: isolate` or a z-index — either makes this
            // a stacking context and traps the snake game's fixed overlay
            // (z-index: 9999) behind the projects column.
            position: relative;
        }
        &.right {
            width: 60%;
        }
        @media (max-width: 768px) {
            &.right,
            &.left {
                width: 100%;
                height: auto;
                min-height: auto;
            }
            &.left {
                padding-bottom: 2.5rem;
            }
            .long-divider {
                margin-bottom: 4rem;
            }
        }
    }
    @media (max-width: 768px) {
        height: auto;
        min-height: auto;
        flex-direction: column;
        // Only meaningful in the stacked (column) layout — side by side there
        // is no "above the fold" to lose the detail below.
        &.detail-first .home-panel.right {
            order: -1;
        }
    }
}
// Shader stack on the left panel: canvas (0) -> scrim (1) -> copy (2).
// Two openings, both in empty corners — full-bleed, the dot matrix fights the
// body copy. Mask layers composite additively by default, so listing them is a
// union; the shader paints a cluster under each one.
.panel-shader {
  z-index: 0;
  --panel-shader-mask:
    radial-gradient(
      ellipse 76% 58% at 88% 78%,
      #000 0%,
      rgba(0, 0, 0, 0.62) 42%,
      transparent 76%
    ),
    // Above the heading. Kept short vertically so it fades out well before
    // "Hi, I'm Luis." rather than sitting behind it.
    radial-gradient(
      ellipse 46% 17% at 0% 0%,
      #000 0%,
      rgba(0, 0, 0, 0.58) 44%,
      transparent 80%
    );
  -webkit-mask-image: var(--panel-shader-mask);
  mask-image: var(--panel-shader-mask);
}

// Keeps the brightest ribbons from lifting the panel off --black.
.panel-scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    rgba(1, 4, 9, 0.72) 0%,
    rgba(1, 4, 9, 0.52) 45%,
    rgba(1, 4, 9, 0.30) 100%
  );
}

.panel-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // The shader's dot field sits directly behind this copy. A tight shadow for
  // edge contrast plus a wide, low-opacity halo that sinks the dots immediately
  // around each glyph — inherited by the panel's children, so the bio and the
  // footer are covered by the one declaration.
  text-shadow:
    0 1px 2px rgba(1, 4, 9, 0.95),
    0 0 12px rgba(1, 4, 9, 0.8);
}

.long-divider {
  width: 100%;
  height: 4px;
  border-radius: 1px;
  background: linear-gradient(270deg, var(--green), var(--lightblue), var(--green));
  background-size: 200% 200%;
  // Both animations declared here: this scoped rule carries an extra [data-v-*]
  // selector, so the global `.rise` shorthand would lose to it. Timing comes from
  // the shared tokens so it cannot drift from the elements rising beside it.
  animation:
    rise-in var(--rise-duration) var(--rise-ease) both,
    gradient 3s ease-in-out infinite;
}
.inner-scroll {
    background-color: #000;
    width: 100%;
    height: 100vh;
    padding: 3rem 5rem;
    overflow-y: scroll;
    @media (max-width: 768px) {
        height: auto;
        padding-top: 2.5rem;
    }
}
</style>
