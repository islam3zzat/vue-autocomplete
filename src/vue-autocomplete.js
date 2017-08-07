/**
  * vue-autocomplete
  * (c) 2017 islam3zzat
  * @license MIT
  */

const vueAutocomplete = {}
import Autocomplete from './Autocomplete.vue'

/**
 * Plugin API
 */
vueAutocomplete.install = function (Vue, options) {
  Vue.component(Autocomplete.name, Autocomplete)
  // Add global method or property
  Vue.myGlobalMethod = function () {
   // something logic ...
  }

  // Add a global asset
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
     // something logic ...
    }
  })

  // Inject some component options
  Vue.mixin({
    created: function () {
     // something logic ...
    }
  })

  // Add an instance method
  Vue.prototype.$myMethod = function (options) {
   // something logic ...
  }
}

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  // window.Vue.use(vueAutocomplete)
}

export default vueAutocomplete
