<template>
  <div class="hello">
    <ui-button color="primary" @click="readBarcode()">აბა ჰე</ui-button>
    <barcode-reader  ref="$$modal"></barcode-reader>
  </div>
</template>

<script>

import UiButton from 'keen-ui/src/UiButton.vue';
import UiSelect from 'keen-ui/src/UiSelect.vue';
import BarcodeReader from './BarcodeReader.vue'

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
    UiSelect,
    BarcodeReader
  },
  methods: {
    readBarcode(){
      this.$refs.$$modal.open();
    }
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
