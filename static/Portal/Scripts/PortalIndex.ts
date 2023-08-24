// Common Imports
import { Component } from "vue-property-decorator";
import { GlobalEvents, GlobalEventBus } from "@ExemplarCommon/eventBus";
import VueLayoutComponent from "./../../../Views/Shared/LayoutComponents/VueLayoutComponent";
import { ApiResponse } from "@ExemplarDataAccess/ApiResponse";
import { ApiDefaultRoute } from "@ExemplarRoutes/ApiDefaultRoute";
import { UserRoute } from "@ExemplarRoutes/UserRoute";
import EditFormComponent from "@ExemplarComponents/EditFormComponent";
import { PortalEvents, EventBus } from "./PortalEvents";
import _ from "lodash";
import $ from "jquery";

// Viewmodel Imports
import AdjusterInspectionsGrid from "./ViewModels/AdjusterInspectionsGrid";
import { AdjusterCounts } from "./ViewModels/AdjusterCounts";
import { AdjusterProfile } from "./ViewModels/AdjusterProfile";
import { AdjusterDetails } from "./ViewModels/AdjusterDetails";

import { DateFormatEnum } from "@ExemplarEnums/DateFormatEnum";

// Component Imports
import { Calendar, CalendarChangeEvent } from "@progress/kendo-vue-dateinputs";
import Scheduler, { SchedulerDataItem } from "@ExemplarComponents/Scheduler";
import Grid from "@ExemplarComponents/Grid/GridComponent";
import PaginatedPageBase from "@ExemplarComponents/Page/PaginatedPageBase";
import GoogleMapComponent from "@ExemplarComponents/GoogleMapComponent";
import AdjusterClaimDetailsComponent from "./AdjusterClaimDetailsComponent";
import { BModal, BButton } from 'bootstrap-vue'
import { ExemplarEntityTypes } from "@ExemplarScripts/Enums/ExemplarEntityTypes";
import { ExemplarPageRoutes } from "@ExemplarEnums/ExemplarPageRoutes";
import { ExemplarFeatureEnum } from "@ExemplarEnums/ExemplarFeatureEnum";
import { ApiClient } from "@ExemplarDataAccess/ApiClient";
import { PaymentProfile } from '@ExemplarViewModels/PaymentProfile';

import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

interface Form {
    Id: number | string,
    FirstName: string,
    LastName: string,
    Company: string,
    Email?: string,
    PhoneNumber: string,
    invoice?: string,
    claims?: string,
    notes?: string,
    PaymentProfile: PaymentProfile
}

extend('email', email);
extend('required', required);

@Component({
    template: "#portal-index",
    components: {
        Calendar,
        GoogleMapComponent,
        Grid,
        VueLayoutComponent,
        EditFormComponent,
        AdjusterClaimDetailsComponent,
        BModal,
        BButton,
        Scheduler,
    }
})

export default class PortalIndexComponent extends PaginatedPageBase<AdjusterInspectionsGrid>  {

    mapMarkers = [];

    googleMapsApiKey: string = $("#googleMapsApiKey").val() as string;

    mapMode: boolean = true;

    adjusterCountModel: AdjusterCounts[] = [];

    scheduleData: SchedulerDataItem[] = [];

    exemplarFeatureEnum = ExemplarFeatureEnum;

    profileModal = {
        data: {} as any,
        open: false,
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
        isPreview: false,
        title:"Adjuster Profile"

    };

    myDate: Date = new Date();

    schedulerDataRoute: string = "";

    schedulerDate: string = new Date().toISOString().slice(0, 10);

    schedulerView: "Day" | "Week" = "Day";

    selectedDate: string = "";

    gridModel = new AdjusterInspectionsGrid();

    model: AdjusterInspectionsGrid[] = new Array<AdjusterInspectionsGrid>();

    showClaimDetails: boolean = false;

    selectedProjectId: number = 0;

    projectStatusId: number = 0;

    projectStatusName: string = "";

    detailsRoute: string = "";

    externalClaimsFormUrl: string = "";

    testRoute: string = "test";

    timezone: string = "Etc/UTC";

    //adjusterRoleId: number = this.currentUser.UserRoles[0].RoleId;
    adjusterRoleId: number = 8;
    adjusterDetailsModal = {
        data: {} as AdjusterDetails,
        open: false,
        noCloseOnBackdrop: true,
        noCloseOnEsc: true,
        isPreview: false
    };

    today: string = this.FormatDate(new Date(), DateFormatEnum.Long);

    loading: boolean = true;
    calendarDate: string = "";

    form: Form = {
        Id: 0,
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Company: "",
        PaymentProfile: {
            BillTo: {
                FirstName: "",
                LastName: "",
                Company: "",
                Address: "",
                City: "",
                State: "",
                Zip: "",
                Country: "",
                PhoneNumber: "",
                FaxNumber: null
            },
            Payment: {
                CreditCard: {
                    CardNumber: "",
                    ExpirationDate: "",
                    CardCode: "",
                    CardType: "",
                    IssuerNumber: ""
                }
            },
            DefaultPaymentProfile: false,
            CustomerProfileId: "",
            CustomerPaymentProfileId: "",
            OriginalNetworkTransId: "",
            OriginalAuthAmount: ""
        }
    }

    constructor() {
        super();
        this.BindGrid = this.BindGrid.bind(this);
        this.RefreshAccessToken();
    }

    async RefreshAccessToken() {
        let refreshTokenUrl: string = $("#exemplarCoreUrl").val() + "Authorization/GetRefreshAccessToken";
        let newaccessToken = await ApiClient.Get(refreshTokenUrl);

        if (newaccessToken != null && newaccessToken.model != null && newaccessToken.model != "") {
            $("#accessToken").val(newaccessToken.model);
            this.accessToken = newaccessToken.model;
            setTimeout(this.RefreshAccessToken, 1800000); //Generate the new token after 30 minutes
        }
    }

    async mounted() {
        console.log("Portal Mounted");
        this.adjusterRoleId = this.currentUser.UserRoles[0].RoleId;
        this.featureId = ExemplarFeatureEnum.Projects;
        this.apiEndpointName = ExemplarEntityTypes.Project;
        this.entityName = this.GetEntityNameByValue(this.apiEndpointName);
        this.detailsController = ExemplarPageRoutes.Portal;
        this.externalClaimsFormUrl = `${this.exemplarCoreUrl}Claims?AdjusterId=${this.currentUser.UserId}&FromPortal=true`;

        this.gridModel.accessToken = this.accessToken;
        this.gridModel.apiBase = this.exemplarApiUrl;
        this.gridModel.linkUrl = `${this.exemplarCoreUrl}Project/Projects/Details?entityId={Id}`;
        this.gridModel.linkCallback = this.GetDetails;
        this.gridModel.dataReadSuccessCallback = this.BindGrid;
        this.gridModel.showLoader = this.showLoader;
        this.gridModel.dataReadRoute = `AdjusterPortal/${this.currentUser.UserId}?RoleId=${this.currentUser.UserRoles[0].RoleId}`;
        this.schedulerDataRoute = `${this.exemplarApiUrl}AdjusterPortal/${this.currentUser.UserId}?RoleId=${this.currentUser.UserRoles[0].RoleId}`;
        this.PopulateGrid();
        GlobalEventBus.$on(GlobalEvents.Unauthorized, () => {
            this.unauthorized = true;
        });

        EventBus.$on(PortalEvents.CloseAdjusterDetails, async () => {
            this.showClaimDetails = false;
        })

        await this.GetSnapShot();
    }

    BindGrid(response: ApiResponse) {
        this.model = _.cloneDeep(response.model.Model);
        this.pager = _.cloneDeep(response.model.Pager);
        (this.schedulerView === "Day") && this.SetScheduleData();
        this.ready = true;
        if (this.mapMode) {
            const mapPoints = response.model.MapPoints;
            const model = response.model.Model;

            this.mapMarkers = mapPoints.map((mapPoint: any, index: any) => {
                const { Position, Info } = mapPoint;
                const { Id, ProjectNumber, InsuredLastName, ClaimNumber } = model[index];
                const Status = model[index].ProjectStatus;
                const Company = model[index].CompanyName;
                const ServiceType = model[index].ServiceTypes;
                return {
                    Position,
                    Info: {
                        Location: Info,
                        ...{ Id, InsuredLastName, ProjectNumber, Company, ClaimNumber, Status, ServiceType }
                    }
                };
            });
        }
        this.BindGridBase(response);
        this.gridModel.showLoader = false;
    }

    async GetProfile() {
        const endPoint = new UserRoute(this.exemplarApiUrl);
        const route = endPoint.GetById(this.currentUser.UserId, 2) + "&RoleId" + this.adjusterRoleId;
        await this.GetModel(route, this.GetProfileCallback);
    }

    GetDetails(event: MouseEvent, dataItem: any, dataIndex: number) {
        this.selectedProjectId = dataItem.Id;
        const endPoint = new ApiDefaultRoute(this.exemplarApiUrl, "Projects");
        this.detailsRoute = endPoint.Get(this.selectedProjectId) + "?MappingType=1";
        this.showClaimDetails = true;
    }

    async GetSnapShot(route?: string) {
        this.loading = true;
        const endPoint = new ApiDefaultRoute(this.exemplarApiUrl, "AdjusterPortal");
        route = route || endPoint.Get(this.currentUser.UserId) + "?MappingType=1&RoleId=" + this.adjusterRoleId;
        if (this.schedulerView.toUpperCase() === "WEEK") {
            route = route + "&ScheduleViewType=1";
        }
        await this.GetModel(route, this.GetSnapShotCallback);
    }

    SetScheduleData(data?: any[]) {
        data = data ?? this.model;
        if (data) {
            this.scheduleData = data.map((project: any) => {
                const start = new Date(project.ScheduleDate);
                const end = new Date(start);
                end.setMinutes(start.getMinutes() + project.Duration);
                return {
                    Description: project.ServiceTypes as string,
                    End: end,
                    Id: project.Id as string,
                    Start: start,
                    Title: project.ClaimNumber as string,
                };
            });
        }
    }

    // Callback
    GetSnapShotCallback(model: AdjusterCounts[]) {
        this.adjusterCountModel = model;
        this.loading = false;
    }

    GetDetailsSuccessCallback(model: any) {
        this.adjusterDetailsModal.data = model;
        this.adjusterDetailsModal.open = true;
    }

    GetProfileCallback(model: AdjusterProfile) {
        this.profileModal.data = model;
        this.profileModal.open = true;
    }

    // Events
    onHide() {
        this.profileModal.open = false;
        GlobalEventBus.$emit(GlobalEvents.CloseAuditLog);
    }

    onCountsClicked(projectStatusId: number, projectStatusName: string) {
        this.projectStatusId = projectStatusId;
        this.projectStatusName = projectStatusName;

        const params = [];
        params.push('MappingType=0');
        this.selectedDate && params.push(`ScheduleDate=${this.selectedDate}`);
        this.projectStatusId && params.push(`ProjectStatusId=${this.projectStatusId}`);
        this.adjusterRoleId && params.push(`RoleId=${this.adjusterRoleId}`);
        (this.schedulerView.toUpperCase() === "WEEK") && params.push(`ScheduleViewType=1`);
        const paramString = params.length ? `?${params.join("&")}` : ""
        this.gridModel.dataReadRoute = `AdjusterPortal/${this.currentUser.UserId}${paramString}`;
        let snapshotReadRoute = `AdjusterPortal/${this.currentUser.UserId}?MappingType=1&RoleId=${this.adjusterRoleId}&ProjectStatusId=${this.projectStatusId}&ScheduleDate=${this.selectedDate}`;
        this.GetSnapShot(this.exemplarApiUrl + snapshotReadRoute);
    }

    onDownloadMenuOpen(dataItem: any): void {
        const gridRef = this.$refs.gridRef as unknown as Grid;
        for (const item of gridRef.dataItems || []) {
            if (item !== dataItem) {
                item.CloseMenu();
            }
        }
    }

    onNewClaimClicked() {
        window.open(this.externalClaimsFormUrl, '_blank');
    }

    async onCalendarChange(event: CalendarChangeEvent) {
        this.selectedDate = event.value ? new Date(event.value as Date).toISOString().slice(0, 10) : "";
        const params = [];
        this.adjusterRoleId && params.push(`RoleId=${this.adjusterRoleId}`);
        if (!event.value) {

            this.projectStatusName = "";
            this.myDate = new Date();
            this.gridModel.dataReadRoute = `AdjusterPortal/${this.currentUser.UserId}?RoleId=${this.adjusterRoleId}`;
            const snapShotRoute = this.exemplarApiUrl + this.gridModel.dataReadRoute + '&MappingType=1';
            this.selectedDate = "";
            await this.GetSnapShot(snapShotRoute);
            return;
        }
        this.myDate = new Date(this.selectedDate);
        this.myDate.setDate(this.myDate.getDate() + 1);

        this.schedulerDate = event.value ? new Date(event.value as Date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);

        const selectedDate = this.selectedDate;
        this.selectedDate && params.push(`ScheduleDate=${this.selectedDate}`);
        this.projectStatusId && params.push(`ProjectStatusId=${this.projectStatusId}`);
        (this.schedulerView.toUpperCase() === "WEEK") && params.push(`ScheduleViewType=1`);
        const paramString = params.length ? `?${params.join("&")}` : ""
        this.gridModel.dataReadRoute = `AdjusterPortal/${this.currentUser.UserId}${paramString}`;
        const snapShotRoute = this.exemplarApiUrl + this.gridModel.dataReadRoute + '&MappingType=1';
        this.GetSnapShot(snapShotRoute);
    }


    onSchedulerViewChange(viewName: "Day" | "Week") {
        this.schedulerView = viewName;
        const params = [];
        this.adjusterRoleId && params.push(`RoleId=${this.adjusterRoleId}`);
        this.selectedDate && params.push(`ScheduleDate=${this.selectedDate}`);
        this.projectStatusId && params.push(`ProjectStatusId=${this.projectStatusId}`);
        if (viewName.toUpperCase() === "WEEK") {
            params.push(`ScheduleViewType=1`);
        }
        const paramString = params.length ? `?${params.join("&")}` : ""
        this.gridModel.dataReadRoute = `AdjusterPortal/${this.currentUser.UserId}${paramString}`;
        const snapShotRoute = this.exemplarApiUrl + this.gridModel.dataReadRoute + '&MappingType=1';
        this.GetSnapShot(snapShotRoute);
    }

    async onSubmit() {
        let url = `${this.exemplarApiUrl}PaymentGateway/ChargeCustomerProfile`;
        const { model } = await (await ApiClient.Post(url, this.form, this.accessToken));
        console.log(model);
        console.log({
            form: this.form
        })
    }
}
