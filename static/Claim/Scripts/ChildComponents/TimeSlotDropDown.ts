import { Component, Watch } from 'vue-property-decorator'
import KendoDropDown from '@progress/kendo-dropdowns-vue-wrapper/dist/es/KendoDropDownList/index'
import Vue from 'Vue'
import type { DropdownListValues } from '@ExemplarViewModels/DropdownListValues'
import DataAccess from '@ExemplarCommon/DataAccess'
import DropdownComponent from '@ExemplarComponents/Controls/DropdownComponent'

Vue.component('KendoDropdownlist', KendoDropDown)

@Component({
  template: '#dropdown-template',
  components: { DropdownComponent },
})

export default class TimeSlotDropdownComponent extends DropdownComponent {
  constructor() {
    super()
  }

  @Watch('bindList')
  async GetData() {
    if (this.bindList && this.uri) {
      this.showLoader = true
      this.dataAccess = this.dataAccess ?? new DataAccess(this.accessToken)
      await this.dataAccess.GetAsync(this.uri, this.CustomCallBack, null, false)
    }
  }

  CustomCallBack(model: DropdownListValues[]) {
    this.$emit('timeslotcallback', model)
    this.GetDataCallback(model)
  }
}
