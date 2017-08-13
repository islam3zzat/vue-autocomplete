<template>
  <div class="vue-autocomplete" v-click-outside="clickedOutside">
      <input
        :style="inputStyles"
        ref="val"
        :placeholder="placeholder"
        :limit="limit"
        @input="changed"
        @focus="gotFocus()"
        :class="{[inputClass]: inputClass}"
        tabindex="-1"
        type="text" >

      <ul :style="optionsStyles" :class="{
        'vue-autocomplete__options': true,
        'vue-autocomplete__options--hidden': !active,
        [optionsClass]: optionsClass
      }">
        <li :style="optionStyles" :class="{
          'vue-autocomplete__option': true,
          [optionClass]: optionClass
        }" @click="select(option)" v-for="(option, index) in options" :tabindex="index+1">
            <slot :option="option" :index="index">
                {{option}}
            </slot>
        </li>
      </ul>
    </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  import clickOutside from './directives/clickOutside'
  import {getOptions, evaluateResponse, transformResponse} from './autocomplete.helpers'

  export default {
    name: 'Autocomplete',
    data () {
      return {
        options: [],
        active: false
      }
    },
    props: {
      placeholder: {
        type: String,
        default: 'Placeholder'
      },
      value: String,
      limit: {
        type: Number,
        default: 5
      },
      api: {
        type: String
      },
      source: {
        type: Array
      },
      param: {
        type: String,
        default: 'q'
      },
      otherParams: {
        type: Object,
        default: function () {
          return {}
        }
      },
      method: {
        type: String,
        default: 'GET'
      },
      closeOnSelect: {
        type: Boolean,
        default: true
      },
      resetOnSelect: {
        type: Boolean,
        default: true
      },
      transform: {
        type: Function
      },
      filterMethod: {
        type: Function
      },
      beforeSearch: {
        type: Function
      },
      afterSearch: {
        type: Function
      },
      beforeUpdateValue: {
        type: Function
      },
      shouldUpdateValue: {
        type: Function
      },
      afterUpdateValue: {
        type: Function
      },
      optionsStyles: {
        type: Object
      },
      optionStyles: {
        type: Object
      },
      inputStyles: {
        type: Object
      },
      optionsClass: {
        type: String
      },
      optionClass: {
        type: String
      },
      inputClass: {
        type: String
      }
    },
    methods: {
      /**
       * deavtivate options once clicked outside
       */
      clickedOutside () {
        if (this.active) {
          this.active = false
        }
      },
      /**
       * sets options active on click
       */
      gotFocus () {
        if (!this.active) this.active = true
        this.$refs.val.setSelectionRange(0, this.value.length)
      },
      /**
       * request options once input changed
       */
      changed: debounce(function (e) {
        const value = e.target.value
        const apiOptions = {
          url: this.api,
          param: this.param,
          otherParams: this.otherParams,
          method: this.method
        }
        const sourceOptions = {
          source: this.source,
          filterMethod: this.filterMethod
        }
        const hooks = {
          beforeSearch: this.beforeSearch && this.beforeSearch.bind(this),
          afterSearch: this.afterSearch && this.afterSearch.bind(this)
        }
        getOptions({value, apiOptions, sourceOptions, hooks})
          .then(res => evaluateResponse(res, this.afterSearch))
          .then(res => transformResponse(res, this.transform))
          .then((res = []) => {
            this.options = res.slice(0, this.limit)
          })
      }, 300),
      /**
      * select option
      */
      select (option) {
        this.$refs.val.value = option
        // execute before update value hock if available
        if (this.beforeUpdateValue) {
          this.beforeUpdateValue(option)
        }
        // execute should update value hock if available
        if (this.shouldUpdateValue) {
          this.shouldUpdateValue(option) && this.$emit('input', option)
        } else {
          this.$emit('input', option)
        }
        // execute after update value hock if available
        if (this.afterUpdateValue) {
          this.afterUpdateValue(option)
        }
        if (this.closeOnSelect) {
          this.active = false
        }
        if (this.resetOnSelect) {
          this.options = []
        }
      }
    },
    /**
     * include required directives
     */
    directives: {
      clickOutside
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vue-autocomplete{
    position: relative;
    display: inline-block;
  }
  .vue-autocomplete__wrapper{

  }
  .vue-autocomplete__options--hidden{
    display: none;
  }

  .vue-autocomplete__options{
    margin-top: 0;
    position: absolute;
    max-height: 200px;
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 20px 0 20px;
    border-radius: 3px;
    overflow: auto;
    list-style-type: none;
    color: white;
  }
  .vue-autocomplete__option{
    cursor: pointer;
    margin-bottom: 5px;
  }
  .vue-autocomplete__option:first-child{
    padding-top: 10px;
  }

</style>
