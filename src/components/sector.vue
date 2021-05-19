<template>
  <div>

    <div class="row center-sm ml1 mr1">
      <div class="col-sm-12 mb2 ta-l" v-if="sectorData.exam">{{ sectorData.exam.SubjectName }}</div>
      <div class="col-sm-12 mb2 ta-l" v-else><h2>დაასკანირეთ შტრიხკოდები სექტორის უწყისზე</h2></div>

        <div class="col-sm-12" v-if="sectorData.exam">
        <div class="row plRow">
          <div class="col-sm-2 b-t b-r ta-c p1 b-l"> საგამოცდო </div>
          <div class="col-sm-3 b-t b-r p1 start-sm">გვარი, სახელი</div>
          <div class="col-sm b-t b-r p1">მაგიდა</div>
          <div class="col-sm-4 b-t b-r p1">შენიშვნა</div>
          <div class="col-sm b-t b-r p1 " >შტრიხ.<br>ნომერი</div>
        </div>
      </div>

      <div class="col-sm-12">
        <div class="row plRow" v-for="candidate in sectorData.candidates" :key="candidate.EntrantID">
          <div class="col-sm-2 b-t b-r ta-c p1 b-l"> {{ candidate.ExamPaperNum }}</div>
          <div class="col-sm-3 b-t b-r p1 start-sm"> {{ candidate.EntrantName }}</div>
          <div class="col-sm b-t b-r p1"> {{ candidate.TableNum }}</div>
          <div class="col-sm-4 b-t b-r p1">
            <select style="border:none; outline: none; width:100%; background-color: transparent"
                    v-model="candidate.ExtraActionType">
              <option value="0"></option>
              <option v-for="row in extraActionTypes" :key="row.ID"
                      :value="row.ID">
                {{ row.Name }}
              </option>
            </select>
          </div>
          <div class="col-sm b-t b-r p1 " >
            <input type="text" style="border:none; outline: none; width:100%; background-color: transparent; text-align: center"/>
          </div>

        </div>
        <div class="row">
          <div class=" col-sm-12 b-t"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {BarcodeInfo, BarcodeType} from './interfaces.js'
import * as SDAO from './dao'


export default {
  name: "sector",
  props: {
    sectorData: {
      default: {}
    }
  },
  data: () => ({
    SubjectID: -1,
    Variant: -1,
    FSubject: -1,
    FExamTime: "",
    FSector: -1,
    FExamCenter: "",

    extraActionTypes: [{ID: 1, Name: "type 1"}, {ID: 2, Name: "type 2"}]
  }),
  async mounted() {
    try {
      let resp = await this.$getData('getExtraActionTypes');
      this.extraActionTypes = resp.data;
    }
    catch (e){
      alert("სისტემური შეცდომაა (getData: getExtraActionTypes)");
    }
  },


}
</script>

<style scoped>
.plRow:hover {
  background-color: #d0faff;
}
</style>