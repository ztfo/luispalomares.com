import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'bulma/css/bulma.css'
import '@/assets/styles/app.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueGtag from 'vue-gtag-next'
import { initEnhancedAnalytics } from '@/utils/analytics'

library.add(fas, far, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(VueGtag, {
  property: {
    id: "G-5LBNH722JB",
    params: {
      send_page_view: true
    }
  },
  appName: 'Luis Portfolio',
  enabled: true,
  debug: process.env.NODE_ENV !== 'production'
});

app.use(store).use(router).mount('#app');

// Initialize enhanced analytics after app is mounted
// Use setTimeout to ensure GA is available and add error handling
setTimeout(() => {
  try {
    initEnhancedAnalytics();
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
    // Don't break the app if analytics fails
  }
}, 1000);