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

library.add(fas, far, fab)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(VueGtag, {
  property: {
    id: "G-5LBNH722JB"
  }
});

app.use(store).use(router).mount('#app');