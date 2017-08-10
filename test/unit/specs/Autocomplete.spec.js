import Vue from 'vue'
import Autocomplete from '@/Autocomplete'

describe('Autocomplete.vue', () => {
  it('should render default placeholder', () => {
    const Constructor = Vue.extend(Autocomplete)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('input').getAttribute('placeholder'))
      .to.equal('Placeholder')
  })
  it('should have no options initially', () => {
    const Constructor = Vue.extend(Autocomplete)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('ul').childElementCount)
      .to.equal(0)
  })
  it('should be initially empty', () => {
    const Constructor = Vue.extend(Autocomplete)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('input').value)
      .to.equal('')
  })
})
