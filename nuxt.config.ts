// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',

  // SSR must stay on so `nuxi generate` prerenders real HTML (not a JS shell).
  ssr: true,

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  // Static-site generation: prerender every route to crawlable HTML.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/project/0', '/project/1', '/project/2'],
    },
  },

  css: [
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

  devtools: { enabled: false },
  compatibilityDate: '2025-01-01',
})
