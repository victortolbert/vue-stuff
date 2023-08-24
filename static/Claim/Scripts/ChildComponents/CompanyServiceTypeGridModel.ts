import type { Method } from 'axios'
import type { GridColumnProps } from '@progress/kendo-vue-grid'
import GridModel from '@ExemplarViewModels/GridModel'
import type IGridModel from '@ExemplarInterfaces/IGridModel'
import type { ApiResponse } from '@ExemplarDataAccess/ApiResponse'
import type { GridValidator } from '@ExemplarComponents/Grid/GridValidation'
import { GridValidatorResponse } from '@ExemplarComponents/Grid/GridValidation'
import $ from 'jquery'
import { AvailableServiceType } from '@ExemplarViewModels/AvailableServiceType'

export class CompanyServiceTypeGridItem extends AvailableServiceType {
  _selected: boolean = false
}

export default class CompanyServiceTypeGridModel extends GridModel implements IGridModel {
  baseURL = 'ExternalWebForm/GetCompanyServiceTypes'
  allowEditing = false
  hasTotalRow = true
  allowScrolling = false
  allowSorting = true
  allowHorizontalScrolling = true
  allowSelecting = true
  allowPaging = true
  allowExpanding = true
  initialPageSize = 100
  currentUserId: number = +$('#userId').val()! as number
  conditinalExpandCallback = this.canRowExpand

  columns: (GridColumnProps | string)[] = [
    {
      field: 'AvailableServiceTypeName',
      title: 'Service Type',
      width: 150,
      orderIndex: 0,
      editable: false,
    },
    {
      field: 'CustomerDescription',
      title: 'Description',
      width: 400,
      orderIndex: 1,
      editable: false,
    },
    {
      field: 'Duration',
      title: 'ServiceTypeDuration',
      orderIndex: 2,
      // editable: false,
      hidden: true,
    },
    {
      field: 'AvailableServiceTypeId',
      hidden: true,
    },
    {
      field: 'CreatedBy',
      hidden: true,
    },
    {
      field: 'CreatedOn',
      hidden: true,
    },
    {
      field: 'CompanyId',
      hidden: true,
    },
    {
      field: 'IsDeleted',
      hidden: true,
    },
    {
      field: 'HasDescription',
      hidden: true,
    },
    {
      field: 'VipPriorityId',
      hidden: true,
    },
    {
      field: 'GeomniServiceType',
      hidden: true,
    },
    {
      field: 'IsVipBillable',
      hidden: true,
    },
    {
      field: 'RowVersion',
      hidden: true,
    },
    {
      field: 'HasChildElements',
      hidden: true,
    },
  ]

  gridType = 'CompanyServiceTypeGridView'
  dataReadRoute = 'CompanyServiceType'
  dataUpdateBase = 'CompanyServiceType/'
  dataUpdateMethod: Method = 'put'

  dataUpdateErrorCallback: (response: ApiResponse) => void

  validators: GridValidator[] = [
    {
      field: 'LaborCost',
      validatorCallBack: this.checkCostValue,
    },
    {
      field: 'BillingPrice',
      validatorCallBack: this.checkCostValue,
    },
  ]

  constructor(companyId: number | null, showActive: boolean, errorCallBack: ((response: ApiResponse) => void)) {
    super()
    this.dataReadRoute = `${this.baseURL}/${companyId}`
    this.dataReadParams = { OnExternalForm: true }
    // this.dataUpdateRoute = `${this.baseURL}?UpdatedBy=${this.currentUserId}`;

    this.dataUpdateErrorCallback = errorCallBack
  }

  canRowExpand(dataItem: any): boolean {
    return false
    // return (dataItem.HasChildElements) ? true : false;
  }

  checkCostValue(cost?: number): GridValidatorResponse {
    let isValid = true

    if (cost === undefined || cost <= 0)
      isValid = false

    const validationMessage = (isValid) ? '' : 'Please enter a valid number for price or cost.'
    return new GridValidatorResponse(isValid, validationMessage)
  }
}
