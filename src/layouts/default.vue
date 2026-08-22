<template lang="pug">
.home
  .home-panel.left
    ShaderCanvas.panel-shader(effect="ribbon-field" :opacity="0.8")
    .panel-scrim
    .panel-content
      .long-divider
      HomePanel
      Footer
  .home-panel.right
    .inner-scroll
      slot
</template>

<script setup>
import HomePanel from '@/components/HomePanel.vue'
import Footer from '@/components/Footer.vue'
import ShaderCanvas from '@/components/Visuals/ShaderCanvas.vue'
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
            // Containing block for the ambient shader and its scrim, both of
            // which are absolutely positioned to inset: 0.
            //
            // Deliberately no `isolation: isolate` and no z-index here: either
            // would make this panel a stacking context and trap the secret
            // snake game's full-viewport overlay (position: fixed, z-index:
            // 9999) behind the projects column. `position: relative` alone is
            // enough to position the canvas.
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
    }
}
// Ambient shader stack on the left panel: canvas (0) -> scrim (1) -> copy (2).
//
// Masked to the lower-right corner rather than left full-bleed. The effect's
// dot matrix is high-frequency enough to fight body copy, so it's confined to
// the empty area below the CTA and beside the footer, where it reads as an
// ambient glow rising off the seam between the two columns.
.panel-shader {
  z-index: 0;
  --panel-shader-mask: radial-gradient(
    ellipse 76% 58% at 88% 78%,
    #000 0%,
    rgba(0, 0, 0, 0.62) 42%,
    transparent 76%
  );
  -webkit-mask-image: var(--panel-shader-mask);
  mask-image: var(--panel-shader-mask);
}

// A light, even veil now that the mask does the heavy lifting — just enough to
// stop the brightest ribbons from lifting the panel off --black.
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
}

.long-divider {
  width: 100%;
  height: 4px;
  border-radius: 1px;
  background: linear-gradient(270deg, var(--green), var(--lightblue), var(--green));
  background-size: 200% 200%;
  animation: gradient 3s ease-in-out infinite;

  // Matches the shader canvases, which hold a still frame under the same
  // setting. Nested here rather than written as a global rule: scoped styles
  // carry an extra [data-v-*] attribute selector, so a global `.long-divider`
  // would lose to the animation declared just above it.
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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
