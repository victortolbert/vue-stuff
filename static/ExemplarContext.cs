namespace Exemplar.Data
{
    using System.ComponentModel.DataAnnotations.Schema;
    using Exemplar.Data.Configuration;
    using Exemplar.Domain;
    using Microsoft.EntityFrameworkCore;

    public class ExemplarContext : DbContext
    {
        public ExemplarContext(DbContextOptions<ExemplarContext> optionsBuilder)
            : base(optionsBuilder)
        {
            Database.SetCommandTimeout(150000);
        }

        // Please Keep in Alphabetical Order
        public virtual DbSet<AdjusterManager> AdjusterManagers { get; set; }

        public virtual DbSet<Announcement> Announcements { get; set; }

        public virtual DbSet<AnnouncementsPublishTo> AnnouncementsPublishTos { get; set; }

        public virtual DbSet<Appointment> Appointments { get; set; }

        public virtual DbSet<AssetAction> AssetActions { get; set; }

        public virtual DbSet<Asset> Assets { get; set; }

        public virtual DbSet<AssetExport> AssetExports { get; set; }

        public virtual DbSet<AssetExportItem> AssetExportItems { get; set; }

        public virtual DbSet<AssetLogItem> AssetLogItems { get; set; }

        public virtual DbSet<AvailableServiceType> AvailableServiceTypes { get; set; }

        public virtual DbSet<AuditLog> AuditLogs { get; set; }

        public virtual DbSet<AuditLogChange> AuditLogChanges { get; set; }

        public virtual DbSet<AutoScheduler> AutoSchedulers { get; set; }

        public virtual DbSet<AvailableServiceTypeDeliverable> AvailableServiceTypeDeliverables { get; set; }

        public virtual DbSet<BillingStatus> BillingStatuses { get; set; }

        public virtual DbSet<CompanyCarrier> CompanyCarriers { get; set; }

        public virtual DbSet<Company> Companies { get; set; }

        public virtual DbSet<CustomerEmailAccount> CustomerEmailAccounts { get; set; }

        public virtual DbSet<CompanyEmailDomain> CompanyEmailDomains { get; set; }

        public virtual DbSet<CompanyServiceType> CompanyServiceTypes { get; set; }

        public virtual DbSet<CompanyNotification> CompanyNotifications { get; set; }

        public virtual DbSet<CompanyNotificationRecipient> CompanyNotificationRecipients { get; set; }

        public virtual DbSet<CompanyUser> CompanyUsers { get; set; }

        //public virtual DbSet<DamageType> DamageTypes { get; set; }
        public virtual DbSet<DialerCallScript> DialerCallScripts { get; set; }

        public virtual DbSet<EvOrderedProject> EvOrderedProjects { get; set; }

        public virtual DbSet<EvOrderStatus> EvOrderStatuses { get; set; }

        public virtual DbSet<EvOrderSubStatus> EvOrderSubStatuses { get; set; }

        public virtual DbSet<ExternalClaimDamageType> ExternalClaimDamageTypes { get; set; }

        public virtual DbSet<ExemplarMessage> ExemplarMessages { get; set; }

        public virtual DbSet<ExemplarRole> ExemplarRoles { get; set; }

        public virtual DbSet<ExemplarRoleFeaturePermission> ExemplarRoleFeaturePermissions { get; set; }

        public virtual DbSet<ExemplarFeature> ExemplarFeatures { get; set; }

        public virtual DbSet<ExemplarFeaturePermission> ExemplarFeaturePermissions { get; set; }

        public virtual DbSet<ExemplarUserRole> ExemplarUserRoles { get; set; }

        public virtual DbSet<ExemplarVariable> ExemplarVariables { get; set; }

        public virtual DbSet<ExternalAuthenticationToken> ExternalAuthenticationTokens { get; set; }

        public virtual DbSet<ExternalAuthenticationTokenService> ExternalAuthenticationTokenServices { get; set; }

        public virtual DbSet<ExternalClaimAsset> ExternalClaimsAssets { get; set; }

        public virtual DbSet<ExternalClaim> ExternalClaims { get; set; }

        public virtual DbSet<ExternalClaimValidationError> ExternalClaimValidationErrors { get; set; }

        public virtual DbSet<ExternalClaimServiceType> ExternalClaimsServiceTypes { get; set; }

        public virtual DbSet<ExternalCompany> ExternalCompanies { get; set; }

        public virtual DbSet<FieldTechAvailability> FieldTechAvailabilities { get; set; }

        public virtual DbSet<FieldTechTravelTime> FieldTechTravelTimes { get; set; }

        public virtual DbSet<GeolocationCall> GeolocationCalls { get; set; }

        public virtual DbSet<HelpDesk> HelpDesks { get; set; }

        public virtual DbSet<HiMarleyConversation> HiMarleyConversations { get; set; }

        public virtual DbSet<HiMarleyOption> HiMarleyOptions { get; set; }

        public virtual DbSet<HoverESXRetry> HoverESXRetries { get; set; }

        public virtual DbSet<HoverJobHistory> HoverJobHistories { get; set; }

        public virtual DbSet<HoverOrderedProject> HoverOrderedProjects { get; set; }

        public virtual DbSet<HoverStatusType> HoverStatusTypes { get; set; }

        public virtual DbSet<IaFirm> IaFirms { get; set; }

        public virtual DbSet<MasterAssetField> MasterAssetFields { get; set; }

        public virtual DbSet<MasterAssetType> MasterAssetTypes { get; set; }

        public virtual DbSet<MasterCommunicationType> MasterCommunicationTypes { get; set; }

        public virtual DbSet<MasterDamageType> MasterDamageTypes { get; set; }

        public virtual DbSet<MasterEntityType> MasterEntityTypes { get; set; }

        public virtual DbSet<MasterEscalationReasonType> MasterEscalationReasonTypes { get; set; }

        public virtual DbSet<MasterExemplarMessageType> MasterExemplarMessageTypes { get; set; }

        public virtual DbSet<MasterNotificationType> MasterNotificationTypes { get; set; }

        public virtual DbSet<MasterPermissionType> MasterPermissionTypes { get; set; }

        public virtual DbSet<MasterPhoneType> MasterPhoneTypes { get; set; }

        public virtual DbSet<MasterVendorType> MasterVendorTypes { get; set; }

        public virtual DbSet<MasterHoverReportType> MasterHoverReportTypes { get; set; }

        public virtual DbSet<MasterRescheduleReasonType> MasterRescheduleReasonTypes { get; set; }

        public virtual DbSet<MasterTechReviewReasonType> MasterTechReviewReasonTypes { get; set; }

        public virtual DbSet<NotificationHistory> NotificationHistories { get; set; }

        public virtual DbSet<Outbuilding> Outbuildings { get; set; }

        [NotMapped]
        public virtual DbSet<PastDueProjectCount> PastDueProjectCounts { get; set; }

        public virtual DbSet<CustomerPaymentProfile> CustomerPaymentProfile { get; set; }

        public virtual DbSet<PendingClaim> PendingClaims { get; set; }

        public virtual DbSet<Permission> Permissions { get; set; }

        public virtual DbSet<ProjectComment> ProjectComments { get; set; }

        public virtual DbSet<ProjectCommunication> ProjectCommunications { get; set; }

        public virtual DbSet<ProjectDamageType> ProjectDamageTypes { get; set; }

        public virtual DbSet<Project> Projects { get; set; }

        public virtual DbSet<ProjectInspection> ProjectInspections { get; set; }

        public virtual DbSet<ProjectInspectionTechnician> ProjectInspectionTechnicians { get; set; }

        public virtual DbSet<ProjectLogItem> ProjectLogItems { get; set; }

        public virtual DbSet<ProjectServiceType> ProjectServiceTypes { get; set; }

        public virtual DbSet<ProjectSourceType> ProjectSources { get; set; }

        public virtual DbSet<ProjectStatusType> ProjectStatuses { get; set; }

        public virtual DbSet<PropertyInspectionForm> PropertyInspectionForms { get; set; }

        public virtual DbSet<PropertyInspectionFormElevation> PropertyInspectionFormElevations { get; set; }

        public virtual DbSet<PropertyInspectionFormElevationEast> PropertyInspectionFormElevationEast { get; set; }

        public virtual DbSet<PropertyInspectionFormElevationNorth> PropertyInspectionFormElevationNorth { get; set; }

        public virtual DbSet<PropertyInspectionFormElevationSouth> PropertyInspectionFormElevationSouth { get; set; }

        public virtual DbSet<PropertyInspectionFormElevationWest> PropertyInspectionFormElevationWest { get; set; }

        public virtual DbSet<PropertyInspectionFormInterior> PropertyInspectionFormInteriors { get; set; }

        public virtual DbSet<PropertyInspectionFormMain> PropertyInspectionFormMain { get; set; }

        public virtual DbSet<PropertyInspectionFormRoof> PropertyInspectionFormRoofs { get; set; }

        public virtual DbSet<PropertyInspectionFormRoofDamagedItem> PropertyInspectionFormRoofDamagedItems { get; set; }

        public virtual DbSet<ProjectInspectionTravelTime> ProjectInspectionTravelTime { get; set; }

        public virtual DbSet<Report> Reports { get; set; }

        public virtual DbSet<ReportPublishTo> ReportPublishTos { get; set; }

        public virtual DbSet<RequestedPostalCode> RequestedPostalCodes { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<ServiceArea> ServiceAreas { get; set; }

        [NotMapped]
        public virtual DbSet<ServiceAreaAvailability> ServiceAreaAvailabilities { get; set; }

        public virtual DbSet<ServiceAreaCapacity> ServiceAreaCapacities { get; set; }

        public virtual DbSet<ServiceAreaPostalCode> ServiceAreaPostalCodes { get; set; }

        public virtual DbSet<ServiceAreaTechnician> ServiceAreaTechnicians { get; set; }

        public virtual DbSet<ServiceRegion> ServiceRegions { get; set; }

        public virtual DbSet<ServiceRegionManager> ServiceRegionManagers { get; set; }

        public virtual DbSet<SmtpLog> SmtpLogs { get; set; }

        public virtual DbSet<State> States { get; set; }

        public virtual DbSet<SymbilityToExemplarAvailableServiceType> SymbilityToExemplarAvailableServiceTypes { get; set; }

        public virtual DbSet<SymbilityToExemplarCompany> SymbilityToExemplarCompanies { get; set; }

        public virtual DbSet<Timezone> Timezones { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserType> UserTypes { get; set; }

        public virtual DbSet<VipCompanyToRule> VipCompanyToRules { get; set; }

        public virtual DbSet<VipInvoice> VipInvoices { get; set; }

        public virtual DbSet<VipRule> VipRules { get; set; }

        public virtual DbSet<VipRuleDetail> VipRuleDetails { get; set; }

        public virtual DbSet<VipToExemplarCompany> VipToExemplarCompanies { get; set; }

        public virtual DbSet<VipUnitOfMeasure> VipUnitOfMeasures { get; set; }

        public virtual DbSet<VipUnitOfMeasureToAvailableServiceType> VipUnitOfMeasureToServiceTypes { get; set; }

        [NotMapped]
        public virtual DbSet<ProcAutoSchedulerInspection> ProcAutoSchedulerInspection { get; set; }

        [NotMapped]
        public virtual DbSet<VwBulkAssignTechnician> VwBulkAssignTechnicians { get; set; }

        [NotMapped]
        public virtual DbSet<VwCompanyServiceTypeVipRuleDetail> VwCompanyServiceTypeVipRuleDetails { get; set; }

        [NotMapped]
        public virtual DbSet<VwEagleViewProject> VwEagleViewProjects { get; set; }

        [NotMapped]
        public virtual DbSet<VwServiceTechDashboard> VwServiceTechDashboards { get; set; }

        [NotMapped]
        public virtual DbSet<VwTodayProjectCount> VwTodaysProjects { get; set; }

        [NotMapped]
        public virtual DbSet<VwTomorrowProjectCount> VwTomorrowsProjects { get; set; }

        public virtual DbSet<XactimateStatus> XactimateStatuses { get; set; }

        public virtual DbSet<XactAnalysisCompanyConfiguration> XactAnalysisCompanyConfigurations { get; set; }

        public virtual DbSet<XactAnalysisServiceMapping> XactAnalysisServiceMappings { get; set; }

        public virtual DbSet<ProjectCommentTemplate> ProjectCommentTemplates { get; set; }

        public virtual DbSet<ExemplarRoleToProjectComment> ExemplarRoleToProjectComments { get; set; }

        public virtual DbSet<MasterCancellationReasonType> MasterCancellationReasonTypes{ get; set; }

        public virtual DbSet<PropertyInspectionFormInteriorDetails> PropertyInspectionFormInteriorDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Please Keep in Alphabetical Order
            modelBuilder.ApplyConfiguration(new _ArchivedAssetConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedAssetHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedAssetLogItemConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedEvOrderedProjectConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedExternalClaimAssetConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedExternalClaimConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedExternalClaimDamageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedExternalClaimServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedGeomniOrderedProjectConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectCommentConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectAssetConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectDamageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectLogItemsConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectRoofAssessmentFormConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectsConfigurations());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedProjectTechnicianAssignmentsConfiguration());
            modelBuilder.ApplyConfiguration(new _ArchivedTechnicianAssignmentsConfiguration());

            modelBuilder.ApplyConfiguration(new AdjusterManagerConfiguration());

            // modelBuilder.ApplyConfiguration(new AddressConfiguration());
            modelBuilder.ApplyConfiguration(new AnnouncementConfiguration());
            modelBuilder.ApplyConfiguration(new AnnouncementsPublishToConfiguration());
            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new AssetActionConfiguration());
            modelBuilder.ApplyConfiguration(new AssetConfiguration());

            modelBuilder.ApplyConfiguration(new AssetExportConfiguration());
            modelBuilder.ApplyConfiguration(new AssetExportItemConfiguration());
            modelBuilder.ApplyConfiguration(new AssetLogItemConfiguration());
            modelBuilder.ApplyConfiguration(new AutoSchedulerConfiguration());
            modelBuilder.ApplyConfiguration(new AuditLogConfiguration());
            modelBuilder.ApplyConfiguration(new AuditLogChangeConfiguration());
            modelBuilder.ApplyConfiguration(new AvailableServiceTypeConfiguration());

            modelBuilder.ApplyConfiguration(new AvailableServiceTypeDeliverableConfiguration());
            modelBuilder.ApplyConfiguration(new BillingStatusConfiguration());
            modelBuilder.ApplyConfiguration(new DamageTypeConfiguration());

            modelBuilder.ApplyConfiguration(new CompanyCarrierConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerEmailAccountConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyEmailDomainConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyUserConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyNotificationConfiguration());
            modelBuilder.ApplyConfiguration(new CompanyNotificationRecipientConfiguration());
            modelBuilder.ApplyConfiguration(new DamageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DialerCallScriptConfiguration());

           // modelBuilder.ApplyConfiguration(new EmailConfiguration());
            modelBuilder.ApplyConfiguration(new EvOrderedProjectConfiguration());
            modelBuilder.ApplyConfiguration(new EvOrderStatusConfiguration());
            modelBuilder.ApplyConfiguration(new EvOrderSubStatusConfiguration());

            modelBuilder.ApplyConfiguration(new ExemplarMessageConfiguration());

            modelBuilder.ApplyConfiguration(new ExemplarUserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ExemplarVariableConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalClaimAssetConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalClaimValidationErrorConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalClaimConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalClaimDamageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalClaimServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ExternalCompanyConfiguration());

            modelBuilder.ApplyConfiguration(new ExemplarRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ExemplarRoleFeaturePermissionConfiguration());
            modelBuilder.ApplyConfiguration(new ExemplarFeatureConfiguration());
            modelBuilder.ApplyConfiguration(new ExemplarFeaturePermissionConfiguration());

            modelBuilder.ApplyConfiguration(new FieldTechAvailabilityConfiguration());
            modelBuilder.ApplyConfiguration(new FieldTechTravelTimeConfiguration());

            modelBuilder.ApplyConfiguration(new GeolocationCallConfiguration());

            modelBuilder.ApplyConfiguration(new HelpDeskConfiguration());

            modelBuilder.ApplyConfiguration(new HiMarleyConversationConfiguration());
            modelBuilder.ApplyConfiguration(new HiMarleyOptionConfiguration());
            modelBuilder.ApplyConfiguration(new HoverESXRetryConfiguration());
            modelBuilder.ApplyConfiguration(new HoverJobHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new HoverOrderedProjectConfiguration());
            modelBuilder.ApplyConfiguration(new HoverStatusTypeConfiguration());

            modelBuilder.ApplyConfiguration(new IaFirmConfiguration());
            modelBuilder.ApplyConfiguration(new LivegenicOrderedProjectConfiguration());

            modelBuilder.ApplyConfiguration(new MasterAddressTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterAssetFieldConfiguration());
            modelBuilder.ApplyConfiguration(new MasterAssetTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterCommunicationTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterDamageTypeConfiguration());

            modelBuilder.ApplyConfiguration(new MasterEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterEscalationReasonTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterExemplarMessageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterHoverReportTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterNotificationTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterPermissionTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterPhoneTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterRescheduleReasonTypeConfiguration());
            modelBuilder.ApplyConfiguration(new MasterTechReviewReasonTypeConfiguration());

            modelBuilder.ApplyConfiguration(new MasterVendorTypeConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new OutbuildingConfiguration());
            modelBuilder.ApplyConfiguration(new PendingClaimConfiguration());
            modelBuilder.ApplyConfiguration(new PermissionConfiguration());

            // modelBuilder.ApplyConfiguration(new PhoneNumberConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectCommentConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectCommunicationConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectConfigurations());
            modelBuilder.ApplyConfiguration(new ProjectDamageTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectInspectionConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectInspectionTechnicianConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectInspectionTravelTimeConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectLogItemConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectCommentConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectSourceConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectStatusConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormConfiguration());

            modelBuilder.ApplyConfiguration(new PropertyInspectionFormElevationConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormElevationEastConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormElevationNorthConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormElevationSouthConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormElevationWestConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormInteriorConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormMainConfiguration());

            modelBuilder.ApplyConfiguration(new PropertyInspectionFormRoofConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormRoofDamagedItemConfiguration());
            modelBuilder.ApplyConfiguration(new ReportConfiguration());
            modelBuilder.ApplyConfiguration(new ReportPublishToConfiguration());

            modelBuilder.ApplyConfiguration(new RequestedPostalCodeConfiguration());

            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new RolePermissionConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceAreaConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceAreaPostalCodeConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceAreaCapacityConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceAreaTechnicianConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceRegionConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceRegionManagerConfiguration());
            modelBuilder.ApplyConfiguration(new SpPastDueProjectCountsConfiguration());
            modelBuilder.ApplyConfiguration(new SmtpLogConfiguration());
            modelBuilder.ApplyConfiguration(new StateConfiguration());

            modelBuilder.ApplyConfiguration(new SymbilityToExemplarAvailableServiceTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SymbilityToExemplarCompanyConfiguration());
            modelBuilder.ApplyConfiguration(new TimezoneConfiguration());

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserTypeConfiguration());

            modelBuilder.ApplyConfiguration(new VipCompanyToRuleConfiguration());
            modelBuilder.ApplyConfiguration(new VipInvoiceConfiguration());
            modelBuilder.ApplyConfiguration(new VipRuleConfiguration());
            modelBuilder.ApplyConfiguration(new VipRuleDetailConfiguration());
            modelBuilder.ApplyConfiguration(new VipToExemplarCompanyConfiguration());
            modelBuilder.ApplyConfiguration(new VipUnitOfMeasureConfiguration());
            modelBuilder.ApplyConfiguration(new VipUnitOfMeasureToAvailableServiceTypeConfiguration());

            modelBuilder.ApplyConfiguration(new VwBulkAssignTechnicianConfiguration());
            modelBuilder.ApplyConfiguration(new VwCompanyServiceTypeVipRuleDetailConfiguration());
            modelBuilder.ApplyConfiguration(new VwEagleViewProjectConfiguration());
            modelBuilder.ApplyConfiguration(new VwServiceTechDashboardConfiguration());
            modelBuilder.ApplyConfiguration(new VwTodaysProjectsConfiguration());
            modelBuilder.ApplyConfiguration(new VwTomorrowsProjectsConfiguration());

            modelBuilder.ApplyConfiguration(new XactAnalysisCompanyConfigurationConfiguration());
            modelBuilder.ApplyConfiguration(new XactAnalysisServiceMappingConfiguration());
            modelBuilder.ApplyConfiguration(new XactimateStatusConfiguration());

            modelBuilder.ApplyConfiguration(new ProjectCommentTemplateConfiguration());
            modelBuilder.ApplyConfiguration(new ExemplarRoleToProjectCommentConfiguration());
            modelBuilder.ApplyConfiguration(new MasterCancellationReasonTypeConfiguration());
            modelBuilder.ApplyConfiguration(new PropertyInspectionFormInteriorDetailsConfiguration());
        }
    }
}
