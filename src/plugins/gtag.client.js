import VueGtag, { trackRouter } from 'vue-gtag-next'
import { initEnhancedAnalytics } from '@/utils/analytics'

// Client-only (.client suffix) so gtag and all window/document access stay off
// the server render. This restores the analytics that main.js used to set up.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-5LBNH722JB',
      params: {
        send_page_view: true,
      },
    },
    appName: 'Luis Portfolio',
    enabled: true,
    debug: import.meta.dev,
  })

  // Automatic page_view tracking on SPA navigation.
  trackRouter(useRouter())

  // Enhanced analytics (scroll depth, visibility, session) after the app is
  // mounted, so gtag has had a chance to load.
  nuxtApp.hook('app:mounted', () => {
    setTimeout(() => {
      try {
        initEnhancedAnalytics()
      } catch (error) {
        console.warn('Analytics initialization failed:', error)
      }
    }, 1000)
  })
})
