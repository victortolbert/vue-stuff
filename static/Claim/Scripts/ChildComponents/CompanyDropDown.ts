import { Component, Watch, Prop } from "vue-property-decorator";
import KendoDropDown from "@progress/kendo-dropdowns-vue-wrapper/dist/es/KendoDropDownList/index";
import Vue from "Vue";
import { DropdownListValues } from "@ExemplarViewModels/DropdownListValues";
import DataAccess from "@ExemplarCommon/DataAccess";
import DropdownComponent from "@ExemplarComponents/Controls/DropdownComponent";
import { drop, findIndex } from "lodash";


Vue.component('kendo-dropdownlist', KendoDropDown)

@Component({
    template: "#dropdown-template",
    components: { DropdownComponent }
})

export default class CompanyDropdownComponent extends DropdownComponent {

    constructor() {
        super();
    } 

    @Watch("bindList")
    async GetData() {
        if (this.bindList && this.uri) {
            this.showLoader = true;
            this.dataAccess = this.dataAccess ?? new DataAccess(this.accessToken);
            await this.dataAccess.GetAsync(this.uri, this.GetDataCallback, null, false);
        }
    }      
}

