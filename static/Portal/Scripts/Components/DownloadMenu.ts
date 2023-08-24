import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button as KendoButton } from '@progress/kendo-vue-buttons'
import { MvcAssetUtilityRoutes } from '@ExemplarRoutes/MvcAssetUtilityRoutes'
import DataAccess from '@ExemplarCommon/DataAccess'
import type IProject from '@ExemplarViewModels/IProject'
import type Grid from '@ExemplarComponents/Grid/GridComponent'
import { Popup as KendoPopup } from '@progress/kendo-vue-popup'
import type AdjusterAsset from '../ViewModels/AdjusterAsset'
import { DownloadMenuItem } from './DownloadMenuItem'

interface IDownloadButtonGrid extends Grid {
  accessToken: string
  showLoader: boolean
}

interface IDownloadButtonGridItem extends IProject {
  $emitGridEvent: (eventType: string, ...args: any[]) => void
  $gridModel: any
  CloseMenu: () => void
}

@Component({
  template: '#download-menu-template',
  components: {
    DownloadMenuItem,
    KendoButton,
    KendoPopup,
  },
})
export class DownloadMenu extends Vue {
  assetUtilityRoutes: MvcAssetUtilityRoutes
  assetType!: string
  dataAccess: DataAccess
  showMenu = false

  @Prop({ required: true })
    dataItem: IDownloadButtonGridItem

  isDisabled() {
    return !this.dataItem.Assets.length
            || !this.dataItem.Assets.some(e => (e.IsDeliverable || e.AssetTypeId == 3) && e.IsDeleted != true)
            || (this.dataItem?.ProjectStatusId < 7)
  }

  mounted() {
    this.assetUtilityRoutes = new MvcAssetUtilityRoutes()
    this.dataAccess = new DataAccess(this.dataItem.$gridModel.accessToken)
    this.dataItem.CloseMenu = this.CloseMenu
  }

  updated() {
    this.dataItem.CloseMenu = this.CloseMenu
  }

  menuItemIsDisabled(assetTypeId: number) {
    return !this.dataItem.Assets.filter((asset: AdjusterAsset) => asset.AssetTypeId === assetTypeId && asset.IsDeleted != true)?.length
  }

  otherMenuItems() {
    const assetTypeIds = this.dataItem.Assets.map(a => a.AssetTypeId)
    return this.dataItem.Assets.filter((asset, idx) =>
      asset.IsDeliverable
            && ![5, 6, 12].includes(asset.AssetTypeId)
            && idx === assetTypeIds.indexOf(asset.AssetTypeId))
      .map(asset => ({
        name: asset.AssetTypeName, // .replace(/([a-z])([A-Z])/g, "$1 $2"),
        assetTypeId: asset.AssetTypeId,
      }))
  }

  CloseMenu() {
    this.showMenu = false
  }

  async GetDownload(route: string, errorCallback: any = null) {
    await this.dataAccess.GetAsync(route, (data: any) => {
      try {
        const binaryString = atob(data.FileContents)
        const binaryLen = binaryString.length
        const bytes = new Uint8Array(binaryLen)
        for (let i = 0; i < binaryLen; i++) {
          const ascii = binaryString.charCodeAt(i)
          bytes[i] = ascii
        }

        const blob = new Blob([bytes], { type: 'application/octet-stream' })

        if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
          (window.navigator as any).msSaveOrOpenBlob(blob)
          return
        }
        const downloadUrl = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = downloadUrl
        a.download = data.FileName.trim()

        document.body.appendChild(a)
        a.click()

        this.dataItem.$emitGridEvent('downloadsuccess')
      }
      catch (err) {
        this.dataItem.$emitGridEvent('downloaderror', this.HandleDownloadError)
      }
    }, this.HandleDownloadError)
  }

  HandleDownloadError(error: Error) {
    this.dataItem.$emitGridEvent('downloaderror', error)
  }

  HandleDownloadRequest(assetTypeId: number) {
    const assetsToDownload = this.dataItem.Assets
      .filter((asset: AdjusterAsset) => asset.AssetTypeId === assetTypeId && asset.IsDeleted != true)
      .map((asset: AdjusterAsset) => asset.Id)
    const uri = this.assetUtilityRoutes.GetAssetDownload(this.dataItem.ProjectNumber.toString(), JSON.stringify(assetsToDownload))
    this.GetDownload(uri)
    this.dataItem.$emitGridEvent('downloadrequest', uri)
  }

  HandleDownloadOriginalFieldAssets(assetTypeId: number) {
    const uri = this.assetUtilityRoutes.GetOriginalFieldAssetDownload(this.dataItem.Id, assetTypeId, this.dataItem.ProjectNumber)
    this.GetDownload(uri)
  }

  ToggleMenu() {
    this.showMenu = !this.showMenu
    this.showMenu && this.dataItem.$emitGridEvent('downloadmenuopen', this.dataItem)
  }
}
