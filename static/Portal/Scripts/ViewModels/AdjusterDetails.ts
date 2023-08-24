import type { ProjectInspectionTechnicianDetails } from '@ExemplarViewModels/ProjectInspectionTechnicianDetails'

export class AdjusterDetails {
  public Id: number | null = null

  public IsEscalation: boolean = false

  public AddressComments: string = ''

  public AdjusterEmail: string = ''

  public AdjusterName: string = ''

  public AdjusterPhone: string = ''

  public BillingContactEmail: string = ''

  public BillingContactName: string = ''

  public BillingContactPhone: string = ''

  public BillingNotes: string = ''

  public ClaimComments: string = ''

  public ClaimNumber: string = ''

  public CreatedBy: string = ''

  public CreatedOn: string = ''

  public CompanyName: string = ''

  public InspectionDate: string = ''

  public InsuredAddress: string = ''

  public ProjectStatus: string = ''

  public ProjectNumber: string = ''

  public ServiceTypes: string = ''

  public ServiceAreaManagers: string[] = []

  public ServiceTechnicans: ProjectInspectionTechnicianDetails[] = []
}
