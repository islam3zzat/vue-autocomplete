// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueAutocomplete from '../src/vue-autocomplete.js'
Vue.config.productionTip = false
Vue.use(vueAutocomplete)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
