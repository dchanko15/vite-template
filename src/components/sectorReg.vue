<template>
  <div class="section " style="padding: 0">
    <div class="hidden-md hidden-sm hidden-xs">
      <div class="d-grid ">
        <div class="-col-xs-12" style="background-color: #efefef; min-width: 180px">
          <div class="row center-xs ">
            <div>
              <h3>შტრიხკოდების<br>სკანირება</h3>
            </div>
            <div>
              <div class="btn-scan" @click='scanBarcodes("დაასკანირეთ სექტორის შტრიხკოდები","8")'>
                <img class="mt3" src="../../public/sector.png" height="64" width="64"/>
                <div style="font-weight: bold; color: #2c3e50">სექტორი</div>
              </div>
              <div class="btn-scan" @click='scanBarcodes("დაასკანირეთ ნაშრომების შტრიხკოდები","4")'>
                <img class="mt3" src="../../public/answerSheet.png" height="64" width="64"/>
                <div style="font-weight: bold; color: #2c3e50">ნაშრომი</div>
              </div>

            </div>
          </div>
          <div class="row center-xs ">
            <div class="col-xs-12 ">
              <h3 class="b-t mt4 pt4">ნაშრომები<br>ყუთში</h3>
            </div>
            <div class="col-xs-12 ">
              <input  style="border-radius: 5px; border: 1px solid lightgrey; padding: 5px 0;
                     background-color: white; font-size: 2rem; font-weight: 600;
                     outline-color: silver; width:80%; text-align: center"
                     value="25" type="text" />

            </div>

          </div>

        </div>

        <div v-if="!showAlert">
          <sector :sector-data="sectorData"></sector>
        </div>
        <div class="m2" v-else>
          <ui-alert @dismiss="showAlert = false; messages=[]" type="error" v-show="showAlert">
            <div v-for="message in messages" :key="message">
              {{ message }}
            </div>
          </ui-alert>
        </div>

      </div>
    </div>

    <div class="hidden-lg hidden-xl p4">
      <h3>ფანჯრის ზომები ძალიან პატარაა</h3>
    </div>
    <barcode-reader @scanComplete="getBarcodes" ref="bReader"></barcode-reader>
  </div>
</template>

<script>
import UiButton from 'keen-ui/src/UiButton.vue'
import UiAlert from 'keen-ui/src/UiAlert.vue'
import UiIcon from 'keen-ui/src/UiIcon.vue'
import api from './testBarcodeScan.js'

import Sector from "./sector.vue";
import BarcodeReader from "./BarcodeReader.vue";
import {BarcodeType, BarcodeInfo} from "./interfaces";


export default {
  name: "sectorReg",
  components: {
    BarcodeReader,
    UiButton,
    UiAlert,
    UiIcon,
    Sector
  },
  data: () => ({
    scanType: 0,
    sectorBarcodes: [],
    sectorData: {},
    showAlert: false,
    alertText: "",
    messages: [],
    tBarcodes: [],
    barcodePageNum: -1,
    examID: -1,
    examCenterID: -1,
    sectorID: -1
  }),
  mounted() {
  },
  methods: {
    async loadSector() {
      let sectorBarcodes = this.sectorBarcodes;

      let pageBarcode;
      let sectorBarcode;
      let messages = this.messages;

      try {
        if (sectorBarcodes.length !== 2) {
          messages.push("დასკანირებული უნდა იყოს ორი შტრიხკოდი.");
          throw new Error("SECTOR");
        }
        if (BarcodeInfo(sectorBarcodes[0], BarcodeType.Sector).valid) {
          sectorBarcode = BarcodeInfo(sectorBarcodes[0], BarcodeType.Sector);
          pageBarcode = BarcodeInfo(sectorBarcodes[1], BarcodeType.BarcodePage);
        } else {
          sectorBarcode = BarcodeInfo(sectorBarcodes[1], BarcodeType.BarcodePage);
          pageBarcode = BarcodeInfo(sectorBarcodes[0], BarcodeType.Sector);
        }

        if (!(sectorBarcode.valid && pageBarcode.valid)) {
          messages.push("სექტორის შტრიხკოდი დაზიანებულია!");
          throw new Error("SECTOR_SECTORBARCODE");
        }


        let id = sectorBarcode.id;
        this.sectorID = id % 1000;
        this.examID = id / 1000 % 1000;
        this.examCenterID = id / 1000000;


        this.barcodePageNum = pageBarcode.id;


        this.sectorData = await this.loadSectorData(this.examCenterID, this.examID, this.sectorID, this.barcodePageNum);

      } catch (e) {
        console.error("LoadSector", e.message, this.examCenterID, this.examID, this.sectorID);
        this.showAlert = true;

        throw new Error("SECTOR");
      }
    },
    async loadSectorData(examCenterID, examID, sectorID, barcodePageNum) {
      let resp = await this.$getData("exam", {examID})
      let ds = {};
      ds.exam = resp.data;
      resp = await this.$getData("placement", {examCenterID, examID, sectorID});
      ds.candidates = resp.data;
      resp = await this.$getData("getBarcodesPage", {barcodePageNum});
      ds.barcodes = resp.data;
      resp = await this.$getData('getExtraActionTypes');
      ds.extraActionTypes = resp.data;
      return ds;
    },

    scanBarcodes(title, st) {
      this.scanType = st;
      this.$refs.bReader.open(title);
    },
    getBarcodes(barcodeList) {
      if (this.scanType === BarcodeType.Sector) {
        this.sectorBarcodes = ['801001010', '500108789'];
        this.loadSector();
      }
      if (this.scanType === BarcodeType.Script) {
        this.sectorBarcodes = [
          '419379901',
          '419380002',
          '419380103',
          '419380204',
          '419380305',
          '419380406',
          '419380507',
          '419380608',
          '419380709',
          '419380810'];
        api.SetSectorBarcodes(this.sectorData.candidates, this.sectorData.extraActionTypes, this.sectorData.barcodes, this.barcodePageNum, this.messages);
        if (this.messages.length === 0)
          api.CheckSectorBarcodes(this.sectorData.candidates, this.sectorBarcodes, this.sectorData.extraActionTypes, this.messages)
        if (this.messages.length > 0)
          this.showAlert = true;
      }

    },

  }

}
</script>

<style scoped>
.d-grid {
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-template-rows: minmax(75vh, auto);
  grid-template-areas: 'sidebar content';
}

.btn-scan {
  height: 120px;
  width: 130px;
  background-color: white;
  -border: 1px solid silver;
  margin-bottom: 1rem;
  border-radius: 5px;
  box-shadow: 5px 10px 15px 0 rgba(0, 0, 0, 0.2);
}

.btn-scan:hover {
  box-shadow: none;
  transition: all 0.3s;
  cursor: pointer;
  transform: translate3d(2px, 2px, 3px);

}
</style>