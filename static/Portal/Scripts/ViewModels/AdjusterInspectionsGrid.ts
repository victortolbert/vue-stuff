import type { GridColumn } from '@ExemplarViewModels/GridModel'
import GridModel from '@ExemplarViewModels/GridModel'
import type IGridModel from '@ExemplarInterfaces/IGridModel'
import { DownloadMenu } from '../Components/DownloadMenu'

export default class AdjusterInspectionsGrid extends GridModel implements IGridModel {
  accessToken: string
  allowSorting = true
  allowFiltering = true
  allowHorizontalScrolling = true
  endPoint: string = 'AdjusterPortal'
  adjusterId: number
  projectStatusId: number
  showLoader = false

  columns: (GridColumn | string)[] = [{
    field: 'Id',
    hidden: true,
  },
  {
    field: 'CompanyName',
    hidden: true,
    width: 301,
  },
  {
    field: 'ClaimNumber',
    sortable: false,
    width: 200,
    // column 1
  },
  {
    field: 'ProjectStatus',
    title: 'Status',
    width: 200,
    // column 4
  },
  {
    field: 'InspectionDateAndTime',
    title: 'Inspection Date',
    sortable: false,
    filterable: false,
    width: 125,
    // column 3
  },
  {
    field: 'ProjectNumber',
    hidden: true,
    width: 305,
  },
  {
    field: 'ProjectStatusId',
    hidden: true,
    width: 306,
  },
  {
    field: 'ServiceTypes',
    sortable: false,
    width: 307,
    // column 5
  },
  {
    field: 'Address',
    sortable: false,
    width: 450,
    // column 2
  },
  {
    field: 'ProjectStatus',
    sortable: false,
    width: 309,
  },
  {
    field: 'TechnicianName',
    width: 200,
    // column 6
  },
  {
    field: 'Assets',
    hidden: true,
    width: 311,
  },
  {
    field: 'MapPoints',
    hidden: true,
  },
  {
    field: 'ScheduleDate',
    hidden: true,
  },
  {
    field: 'Duration',
    hidden: true,
  },
  {
    cell: DownloadMenu,
    key: 'DownloadMenu',
    filterable: false,
    sortable: false,
    width: 150,
    // Column 7
  },
  {
    field: 'closeMenu',
    hidden: true,
  },
  ]

  dataReadRoute = ''
  gridType = 'DefaultGridView'
  linkUrlParams = ['Id']
  height = '400px'

  constructor() {
    super()
  }
}
