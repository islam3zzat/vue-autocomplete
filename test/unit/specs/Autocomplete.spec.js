import Vue from 'vue'
import Autocomplete from '@/Autocomplete'

describe('Autocomplete.vue', () => {
  describe('default values', () => {
    let Constructor
    let vm
    before(function () {
      Constructor = Vue.extend(Autocomplete)
      vm = new Constructor().$mount()
    })
    after(function () {
      vm.$destroy()
      Constructor = null
      vm = null
    })
    it('should render default placeholder', () => {
      expect(vm.$el.querySelector('input').getAttribute('placeholder'))
        .to.equal('Placeholder')
    })
    it('should have no options initially', () => {
      expect(vm.$el.querySelector('ul').childElementCount)
        .to.equal(0)
    })
    it('should be initially empty', (done) => {
      expect(vm.$el.querySelector('input').value)
        .to.equal('')
      done()
    })
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
  it('should execute transform function', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const transform = sinon.spy()
    const vm = new Constructor({
      propsData: {
        transform,
        source: ['aww', 'aqq', 'qwqw']
      }
    }).$mount()
    vm.$refs.val.value = 'a'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      expect(transform).to.have.been.calledWith(['aww', 'aqq'])
      done()
    }, 400)
  })
  it('should execute afterSearch function', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const afterSearch = sinon.spy()
    const vm = new Constructor({
      propsData: {
        afterSearch,
        source: []
      }
    }).$mount()
    vm.$refs.val.value = '1231'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      expect(afterSearch).to.have.been.calledOnce
      done()
    }, 400)
  })
  it('should execute beforeSearch function', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const beforeSearch = sinon.spy()
    const vm = new Constructor({
      propsData: {
        beforeSearch,
        source: []
      }
    }).$mount()
    vm.$refs.val.value = '1231'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      expect(beforeSearch).to.have.been.calledOnce
      done()
    }, 400)
  })
  it('should execute beforeUpdateValue function', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const beforeUpdateValue = sinon.spy()
    const vm = new Constructor({
      propsData: {
        beforeUpdateValue,
        source: ['aww', 'aqq', 'qwqw']
      }
    }).$mount()
    vm.$refs.val.value = 'a'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      vm.$el.querySelector('li').click()
      expect(beforeUpdateValue).to.have.been.calledOnce
      done()
    }, 400)
  })
  it('should execute afterUpdateValue function', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const afterUpdateValue = sinon.spy()
    const vm = new Constructor({
      propsData: {
        afterUpdateValue,
        source: ['aww', 'aqq', 'qwqw']
      }
    }).$mount()
    vm.$refs.val.value = 'a'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      vm.$el.querySelector('li').click()
      expect(afterUpdateValue).to.have.been.calledOnce
      done()
    }, 400)
  })
  it('should show relevant options', (done) => {
    const Constructor = Vue.extend(Autocomplete)
    const transform = sinon.spy()
    const vm = new Constructor({
      propsData: {
        transform,
        source: ['Xval 1', 'val 2', 'Xval 3']
      }
    }).$mount()
    vm.$refs.val.value = 'X'
    vm.$refs.val.dispatchEvent(new Event('input'))
    setTimeout(() => {
      expect(transform).to.have.been.calledWith(['Xval 1', 'Xval 3'])
      done()
    }, 400)
  })
})
