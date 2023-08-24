import { Component, Prop, Vue } from "vue-property-decorator";
import { Button as KendoButton } from "@progress/kendo-vue-buttons";
import { MvcAssetUtilityRoutes } from "@ExemplarRoutes/MvcAssetUtilityRoutes";
import { Asset } from "../../../PropertyInspection/Scripts/ViewModels/Asset";
import DataAccess from "@ExemplarCommon/DataAccess";
import IProject from "@ExemplarViewModels/IProject";
import Grid from "@ExemplarComponents/Grid/GridComponent";

@Component({
    template: "#download-menu-item-template",
    components: {
        KendoButton,
    },
})
export class DownloadMenuItem extends Vue {
    @Prop({ required: true })
    assetTypeId!: number;

    @Prop({ required: false, default: false })
    disabled!: boolean;

    label = "";

    mounted() {
        const slot = this.$slots.default?.[0] as { text: string } | undefined;
        this.label = slot ? `Download ${slot.text?.trim()} ${this.disabled ? "disabled" : ""}` : "";
    }

    AssetDownloadedSuccessCallback(model: any) {
    }

    Download() {
        !this.disabled && this.$emit("downloadrequest", this.assetTypeId);
    }
}