import { Component, Watch } from 'vue-property-decorator'
import KendoDropDown from '@progress/kendo-dropdowns-vue-wrapper/dist/es/KendoDropDownList/index'
import Vue from 'Vue'
import DataAccess from '@ExemplarCommon/DataAccess'
import DropdownComponent from '@ExemplarComponents/Controls/DropdownComponent'

Vue.component('KendoDropdownlist', KendoDropDown)

@Component({
  template: '#dropdown-template',
  components: { DropdownComponent },
})

export default class CompanyDropdownComponent extends DropdownComponent {
  constructor() {
    super()
  }

  @Watch('bindList')
  async GetData() {
    if (this.bindList && this.uri) {
      this.showLoader = true
      this.dataAccess = this.dataAccess ?? new DataAccess(this.accessToken)
      await this.dataAccess.GetAsync(this.uri, this.GetDataCallback, null, false)
    }
  }
}
