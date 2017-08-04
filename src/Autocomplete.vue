<template>
    <div class="autocomplete">
        <input
                :placeholder="placeholder"
                @input="changed"
                class="autocomplete__input"
                type="text" >
        <div class="autocomplete__wrapper">
          <slot name="options" :options="options">
            <ul class="autocomplete__options">
              <li v-for="option in options">{{option}}</li>
            </ul>
          </slot>
          <slot name="child2" secondmsg="text2"></slot>
        </div>
    </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  import axios from 'axios'
  export default {
    name: 'Autocomplete',
    data () {
      return {
        options: [],
        name: 'isalm',
        defaultSlotText: "I'll get rendered inside the default slot.",
        namedSlotText: "I'll get rendered inside the *best* slot."

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
      path: undefined
    },
    methods: {
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
    margin: auto;
    width: 50%;
  }
  .autocomplete__input{
    /*top: 0;*/
    /*left: 0;*/
  }
  .autocomplete__wrapper{
    position: absolute;
    max-height: 200px;
    overflow: auto;
  }
  .autocomplete__wrapper--hidden{
    display: none;
  }

  .autocomplete__options{
    list-style-type: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 0 20px 0 20px;
    border-radius: 3px;
  }
  .autocomplete__option{
    cursor: pointer;
    margin-bottom: 5px;
  }
  .autocomplete__option:first-child{
    padding-top: 20px;
  }
</style>
