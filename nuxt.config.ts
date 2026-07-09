import { projects } from './src/composables/useProjects.js'

// Derive the prerender list from the project data so new projects are picked
// up automatically (crawlLinks also discovers them from the rendered cards).
const projectRoutes = projects.map((p) => `/project/${p.id}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  // SSR must stay on so `nuxi generate` prerenders real HTML (not a JS shell).
  ssr: true,

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
      routes: ['/', '/sitemap.xml', ...projectRoutes],
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
