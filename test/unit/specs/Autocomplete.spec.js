import Vue from 'vue'
import Autocomplete from '@/Autocomplete'

describe('Autocomplete.vue', () => {
  it('should render default placeholder', () => {
    const Constructor = Vue.extend(Autocomplete)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('input').getAttribute('placeholder'))
      .to.equal('Placeholder')
  })
  it('should render provided placeholder', () => {
    const Constructor = Vue.extend(Autocomplete)
    const vm = new Constructor({
      propsData: {
        placeholder: 'weee'
      }
    }).$mount()
    expect(vm.$el.querySelector('input').getAttribute('placeholder'))
      .to.equal('weee')
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
  it('should execute transform function', () => {
    const Constructor = Vue.extend(Autocomplete)
    const cb = sinon.spy()
    const vm = new Constructor({
      propsData: {
        transform: cb
      }
    }).$mount()
    const input = vm.$el.querySelector('input')
    input.value = 'ruby'
    input.dispatchEvent(new Event('input'))
    setTimeout(() => {
      cb.should.have.been.calledOnce()
    }, 500)
  })
  it('should execute beforeApiCall function before api call', () => {
    const Constructor = Vue.extend(Autocomplete)
    const cb = sinon.spy()
    const vm = new Constructor({
      propsData: {
        beforeApiCall: cb
      }
    }).$mount()
    const input = vm.$el.querySelector('input')
    input.value = 'ruby'
    input.dispatchEvent(new Event('input'))
    setTimeout(() => {
      cb.should.have.been.calledOnce()
    })
  })
})
