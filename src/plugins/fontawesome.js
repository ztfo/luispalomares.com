import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faArrowUpRightFromSquare,
  faLink,
  faCirclePlay,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import only the icons the site actually uses instead of the whole library —
// keeps the client bundle tiny (the full fas/far/fab set is ~1.8 MB).
config.autoAddCss = false

library.add(
  faAngleLeft,
  faArrowUpRightFromSquare,
  faLink,
  faCirclePlay,
  faXmark,
  faDribbble,
  faGithub,
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
