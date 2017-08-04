<template>
    <div>
        <input
                :placeholder="placeholder"
                @input="changed"
                type="text" >
        <div>
          <slot name="options" :options="options">
            <ul>
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
      }, 300)
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
  }
  .autocomplete__options{
    position: absolute;
    top: 30px;
    list-style-type: none;
    background-color: gray;
    max-height: 200px;
    overflow: auto;
  }
</style>
