// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faMapMarkerAlt,
  faMobileAlt,
  faEnvelope,
  faHome
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// BootstrapVue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// Font Awesome 5
library.add(faMapMarkerAlt, faMobileAlt, faEnvelope, faGithub, faLinkedin, faHome)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Custom directives
Vue.directive('opacity', (el, binding) => {
  el.style.opacity = binding.value ? 1 : 0
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
  }
})
