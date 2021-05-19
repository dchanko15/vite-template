<template>

  <ui-modal align-top :align-top-margin="200"
            dismiss-on="close-button esc"
            ref="$$BarcodeReader"
            :title="headerText"
            :prevent-shift="true"
            remove-header

            @reveal="$refs.$$barcode.focus();"
  >
    <div class="row">
      <div class="col mt6 mr3">
        <img src="/barcode1.png" width="100">
      </div>
      <div class="col-xs " style="position: relative">
        <input type="text"
               ref="$$barcode"
               v-model="barcode"
               class="hidden-input"
               @keydown.enter="addOneBarcode()"
               @blur="$refs.$$barcode.focus()"/>

        <div>
          <h2>{{ headerText }}</h2>
          <h3> {{ scannedQty ? `სკანირებულია ${scannedQty} შტრიხკოდი` : '' }}

          </h3>
          <br>
          <br>
          <br>
        </div>
        <div style="position: absolute; right: 0; bottom: 0">
          <ui-button type="primary" @click="endScanning()">სკანირების დასრულება</ui-button>
        </div>
      </div>
    </div>

  </ui-modal>

</template>

<script>
import UiModal from 'keen-ui/src/UiModal.vue'
import UiButton from 'keen-ui/src/UiButton.vue'

export default {
  name: "BarcodeReader",
  components: {
    UiModal,
    UiButton
  },
  props: {
    oneScanQty: {
      default: 1,
    },

  },
  data: () => ({
    barcode: "",
    barcodes: [],
    barcodeList: [],
    readyBarcodes: 0,
    headerText: "",
    scannedQty: 0

  }),
  methods: {
    open(caption) {
      this.headerText = caption;
      this.$refs.$$BarcodeReader.open();
    },
    addOneBarcode() {
      this.readyBarcodes++;
      this.barcodes.push(this.barcode);
      if (this.oneScanQty > 1 && this.readyBarcodes === this.oneScanQty) {
        this.barcodeList.push(this.barcodes);
        this.barcodes.length = 0;
        this.scannedQty++;
      }
      this.barcode = "";
      if (this.oneScanQty === 1)
        this.scannedQty++;
    },
    scannedBarcodes(){
      return (this.oneScanQty > 1)? this.barcodeList: this.barcodes
    },
    endScanning(){
      this.$refs.$$BarcodeReader.close();
      this.barcodes.push('000001');
      this.$emit('scanComplete',  (this.oneScanQty > 1)? this.barcodeList: this.barcodes);
    }
  },
}
</script>

<style scoped>
.hidden-input {
  width: 0;
  height: 0;
  border: none;
  outline: none;
}
</style>