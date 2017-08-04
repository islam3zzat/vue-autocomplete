<template>
  <div class="hello">
    <div class="row">
      <div class="col-md-6">
        repos
      </div>
      <div class="col-md-6">
        <Autocomplete
          :path="path"
          v-model="msg">
          <template slot="options" scope="{options}">
            <!--<div>-->
            <!--<p v-for="option in options">-->
            <!--{{option}}-->
            <!--</p>-->
            <!--</div>-->
          </template>
        </Autocomplete>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '',
    }
  },
  methods: {
    path(res){
      return res.data.items.map(i => i.name)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
