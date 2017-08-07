<template>
  <div class="autocomplete" v-click-outside="clickedOutside">
      <input
        :style="inputStyles"
        ref="val"
        :placeholder="placeholder"
        @input="changed"
        @focus="gotFocus()"
        :class="{[inputClass]: inputClass}"
        type="text" >

      <ul :style="optionsStyles" :class="{
        'autocomplete__options': true,
        'autocomplete__options--hidden': !active,
        [optionsClass]: optionsClass
      }">
        <li :style="optionStyles" :class="{
          autocomplete__option: true,
          [optionClass]: optionClass
        }" @click="select(option)" v-for="(option, index) in options">
            <slot :option="option" :index="index">
                {{option}}
            </slot>
        </li>
      </ul>
    </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  import axios from 'axios'
  import clickOutside from './directives/clickOutside'

  export default {
    name: 'Autocomplete',
    data () {
      return {
        options: [],
        active: false,
      }
    },
    props: {
      placeholder: {
        type: String,
        default: 'Placeholder'
      },
      value: String,
      api: {
        type: String,
        default: 'https://api.github.com/search/repositories'
      },
      param: {
        type: String,
        default: 'q'
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
      path: {
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
      clickedOutside(){
        if(this.active) {
          this.active = false
        }
      },
      /**
       * sets options active on click
       */
      gotFocus(){
        if(!this.active) this.active = true
        this.$refs.val.setSelectionRange(0, this.value.length)

      },
      /**
       * request options once input changed
       */
      changed: debounce(function(e) {
        const value = e.target.value
        this.$emit('input', value)
        axios({
          method: this.method,
          url: this.api,
          params: {
            q: value
          }
        }).then(res => {
          const path = this.path
          let options
          if(typeof path === 'string') {
            options = res[path]
          } else if (typeof path === 'function') {
            options = path(res)
          } else {
            options = res
          }
          this.options = options
        })
      }, 300),
      /**
      * select option
      */
      select(option){
        this.$refs.val.value = option
        this.$emit('input', option)
        if(this.closeOnSelect){
          this.active = false
        }
        if(this.resetOnSelect){
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
  .autocomplete{
    position: relative;
    display: inline-block;
  }
  .autocomplete__wrapper{

  }
  .autocomplete__options--hidden{
    display: none;
  }

  .autocomplete__options{
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
  .autocomplete__option{
    cursor: pointer;
    margin-bottom: 5px;
  }
  .autocomplete__option:first-child{
    padding-top: 10px;
  }

</style>
