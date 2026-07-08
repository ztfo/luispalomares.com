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
    // Our source lives under src/, so point the scanner there (the module's
    // defaults are relative to the project root and would miss everything,
    // purging classes that are actually used).
    content: [
      'src/components/**/*.vue',
      'src/layouts/**/*.vue',
      'src/pages/**/*.vue',
      'src/app.vue',
      'src/error.vue',
      'src/plugins/**/*.{js,ts}',
      'src/composables/**/*.{js,ts}',
    ],
    // The module's default extractor includes "." in its token charset, which
    // mangles Pug's dot-chained class syntax (`.home-panel.left` becomes one
    // token instead of two) and wrongly purges those classes. Split on dots.
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
