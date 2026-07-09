import { projects } from './src/composables/useProjects.js'

// Derive the prerender list from the project data so new projects are picked
// up automatically (crawlLinks also discovers them from the rendered cards).
const projectRoutes = projects.map((p) => `/project/${p.id}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  // SSR must stay on so `nuxi generate` prerenders real HTML (not a JS shell).
  ssr: true,

  modules: ['nuxt-purgecss'],

  // vue-fontawesome ships CJS-only (no exports map), so in the Nitro server
  // runtime it loads a second copy of fontawesome-svg-core: library.add()
  // registers icons in the ESM copy while the component looks them up in the
  // CJS copy, and every icon prerenders empty (hydration mismatch on every
  // page). Transpiling it into the server bundle keeps one module instance.
  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
      meta: [{ name: 'theme-color', content: '#010409' }],
    },
  },

  // Static-site generation: prerender every route to crawlable HTML.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', ...projectRoutes],
    },
  },

  css: [
    // Self-hosted Inter (variable) via the @fontsource npm package — no
    // external Google Fonts request at build or runtime.
    '@fontsource-variable/inter/index.css',
    'bulma/css/bulma.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/styles/app.scss',
  ],

  // Strip unused Bulma. Safelist runtime-applied classes that never appear
  // literally in templates (Font Awesome SVG classes, active-link classes)
  // plus Bulma's is-/has- modifier families for safety.
  purgecss: {
    // nuxt-purgecss joins relative content paths to srcDir (src/), so these
    // must NOT be prefixed with src/ — a src/ prefix resolves to src/src/**
    // and matches nothing. error.vue must be listed explicitly: the module's
    // built-in globs cover components/layouts/pages/app.vue but omit it, so
    // its classes get silently purged (unstyled 404 page).
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'app.vue',
      'error.vue',
      'plugins/**/*.{js,ts}',
      'composables/**/*.{js,ts}',
    ],
    // The module's default extractor includes "." in its token charset, which
    // mangles Pug's dot-chained class syntax (`.home-panel.left` becomes one
    // token instead of two) and wrongly purges those classes. Split on dots.
    // Note: purge runs before Vue adds data-v scope attributes, so the
    // data-v- safelist below cannot protect scoped styles — only content
    // scanning does.
    defaultExtractor: (content) => {
      const withoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '')
      return withoutStyleBlocks.match(/[\w-]+/g) || []
    },
    safelist: {
      standard: [/^svg-inline--fa/, /^fa-/, /-fa-/, 'html', 'body'],
      greedy: [/^is-/, /^has-/, /router-link/, /nuxt-link/, /data-v-/],
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:math"; @use "sass:color";',
        },
      },
    },
  },

  features: { inlineStyles: false },

  devtools: { enabled: false },
  compatibilityDate: '2025-01-01',
})
