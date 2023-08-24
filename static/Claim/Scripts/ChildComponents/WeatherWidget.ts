import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import HttpClient from '@ExemplarDataAccess/HttpClient'
import { ResponseType } from '@ExemplarEnums/ResponseType'
import StateUtilities from '../../../../Scripts/Utilities/StateUtilities'

@Component({
  template: '#weather-widget-template',
})
export default class WeatherWidget extends Vue {
  static ApiBase: string = 'https://api.weather.gov/'

  @Prop({ required: false, type: String, default: null })
    city: string | null

  @Prop({ required: false, type: Number, default: null })
    stateId: number | null

  @Prop({ required: false, default: null })
    date: Date | null

  @Prop({ type: Number })
    latitude: number

  @Prop({ type: Number })
    longitude: number

  forecast: any = {}
  loading: boolean = false
  loadingError: boolean = false

  mounted() {
    this.updateForecast()
  }

  @Watch('date')
  onDateChange() {
    this.updateForecast()
  }

  @Watch('latitude')
  onLatitudeChange() {
    this.updateForecast()
  }

  @Watch('longitude')
  onLongitudeChange() {
    this.updateForecast()
  }

  async updateForecast(): Promise<void> {
    try {
      if (this.latitude === undefined
                || this.latitude === null
                || this.longitude === undefined
                || this.longitude === null
                || !this.date)
        return

      const pointData = await HttpClient.Get(`${WeatherWidget.ApiBase}points/${this.latitude},${this.longitude}`)
      // console.log(pointData);

      if (pointData.result !== ResponseType.Success || !pointData.model) {
        this.loadingError = true
        this.$emit('loadError', pointData)
        return
      }

      this.loading = true
      const gridId = pointData.model.properties.gridId
      const gridX = pointData.model.properties.gridX
      const gridY = pointData.model.properties.gridY

      const weatherData = await HttpClient.Get(`${WeatherWidget.ApiBase}gridpoints/${gridId}/${gridX},${gridY}/forecast`)

      if (weatherData.result !== ResponseType.Success || !weatherData.model) {
        this.loadingError = true
        this.$emit('loadError', weatherData)
        return
      }

      const forecastData = weatherData.model.properties.periods.find((forecastPeriod: any) =>
        new Date(forecastPeriod.startTime) <= this.date!
                && new Date(forecastPeriod.endTime) >= this.date!)

      if (!forecastData) {
        this.loadingError = true
        this.$emit('loadError', weatherData)
        return // TODO: Outside of forecast range message
      }

      this.forecast = forecastData

      if (this.city && this.stateId) {
        this.forecast.city = this.city
        this.forecast.state = StateUtilities.GetStateAbbreviationById(this.stateId)
      }

      this.loading = false
    }
    catch {
      this.loadingError = true
      this.loading = false
      this.$emit('loadError')
    }
  }
}
