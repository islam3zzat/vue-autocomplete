const clickOutside = {
  bind (el, binding) {
    el.addEventListener('click', clickOutside.stopProp)
    document.body.addEventListener('click', binding.value)
  },
  unbind (el, binding) {
    el.removeEventListener('click', clickOutside.stopProp)
    document.body.removeEventListener('click', binding.value)
  },
  stopProp (event) {
    event.stopPropagation()
  }
}
export default clickOutside
