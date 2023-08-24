import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { BModal, BButton } from 'bootstrap-vue'
import { ProjectComment } from "@ExemplarViewModels/ProjectComment";
import { AdjusterDetails } from "./ViewModels/AdjusterDetails";
import DataAccess from "@ExemplarCommon/DataAccess";
import { PortalEvents, EventBus } from "./PortalEvents";
import { TabStrip } from '@progress/kendo-layout-vue-wrapper';
import { ApiDefaultRoute } from "@ExemplarRoutes/ApiDefaultRoute";
import $ from "jquery";

Vue.component('kendo-tabstrip', TabStrip)
@Component({
    template: "#adjuster-claim-details-template",
    components: {
        BModal, BButton, 'tabstrip': TabStrip
    }
})
export default class AdjusterClaimDetailsComponent<T> extends Vue {
    @Prop({ required: true, type: Boolean, default: false })
    showClaimDetails!: boolean;

    @Prop({ required: true, type: String })
    route!: string;

    @Prop({ required: true, type: Number })
    projectId!: number;

    accessToken: string = $("#accessToken").val() as string;

    exemplarApiUrl: string = $("#exemplarApiUrl").val() as string;

    showDetailsSection: boolean = true;

    projectComments: ProjectComment[] = [];
    commentsSelected: boolean = false;

    dataAccess: DataAccess = new DataAccess(this.accessToken);

    commentsRoute: ApiDefaultRoute;

    claimDetails = {
        model: {} as AdjusterDetails,
        open: false,
        noCloseOnBackdrop: true,
        noCloseOnEsc: true
    };

    @Watch("showClaimDetails")
   async showModal() {
        if (this.showClaimDetails) {
            await this.dataAccess.GetAsync(this.route, this.GetDataCallback, null);
        }
    }

    GetDataCallback(model: AdjusterDetails) {

        this.claimDetails.model = model;
        this.claimDetails.open = this.showClaimDetails;
        this.showDetailsSection = true;
    }

    async onTabSelect(e: any) {
        const tabClicked = $(e.item).find("> .k-link").text();

        if (tabClicked.trim() === 'Comments') {

            if (!this.commentsSelected) {
                this.commentsRoute = new ApiDefaultRoute(this.exemplarApiUrl, "ProjectComments");
                let route = this.commentsRoute.uri + '?ProjectId=' + this.projectId;
                await this.dataAccess.GetAsync(route, this.ProjectCommentsCallback, null);
            } else {
                this.showDetailsSection = false;
            }
        }
        else {
            this.showDetailsSection = true;
        }
    }

    ProjectCommentsCallback(model: any) {
        this.commentsSelected = true;
        this.showDetailsSection = false;
        this.projectComments = model;
    }

    onHide() {
        this.closeModal();
    }

    hide() {
        this.closeModal();
    }

    closeModal() {
        this.commentsSelected = false;
        this.claimDetails.open = false;
        EventBus.$emit(PortalEvents.CloseAdjusterDetails);
    }
}


