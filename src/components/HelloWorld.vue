<template>
  <div >
    <ui-button  color="primary" >აბა ჰე</ui-button>

  </div>
</template>

<script>

import UiButton from 'keen-ui/src/UiButton.vue';



export default {
  name: 'HelloWorld',
  props: {
    msg: String,

  },
  data: () => ({
    selVal: "",
  }),
  components: {
    UiButton,


  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
