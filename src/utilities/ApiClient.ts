import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import * as qs from 'qs'
import { ApiResponse } from './ApiResponse'

export class ApiClient {
  static Get = async (url: string, accessToken: string = '') => {
    console.log(`Getting Data with Url: ${url}`)
    let error: boolean = false
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    let apiErrorResponse: ApiResponse = new ApiResponse()
    const axiosResponse: any = await axios.get(url, config)
      //  let axiosResponse: any = await axios.get(url)
      .catch((x) => {
        error = true
        apiErrorResponse = ApiResponse.Parse(x.response.data, x.response.status)
      })

    if (error) {
      // console.log("apiErrorResponse: " + JSON.stringify(apiErrorResponse));
      return apiErrorResponse
    }
    else {
      // console.log("axiosResponse.data: " + JSON.stringify(axiosResponse.data));
      return ApiResponse.Parse(axiosResponse.data, axiosResponse.status)
    }
  }

  static DeleteBatch = async (url: string, successCallback: any, accessToken: string = '') => {
    console.log(`Deleting Data with Url: ${url}`)
    const options: AxiosRequestConfig = {
      method: 'delete',
      headers: { 'content-type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${accessToken}` },
      url,
    }
    await axios(options)
  }

  static Post = async (url: string, data: any, accessToken: string = '') => {
    console.log(`Posting Data with Url: ${url}\n  Params: ${JSON.stringify(data)}`)
    let apiErrorResponse: ApiResponse = new ApiResponse()
    let error: boolean = false
    const options: AxiosRequestConfig = {
      method: 'post',
      headers: { 'content-type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${accessToken}` },
      data: JSON.stringify(data),
      url,
    }
    const axiosResponse: any = await axios(options)
      .catch((x) => {
        error = true
        apiErrorResponse = ApiResponse.Parse(x.response.data, x.response.status)
      })

    if (error)
      return apiErrorResponse
    else
      return ApiResponse.Parse(axiosResponse.data, axiosResponse.status)
  }

  static Put = async (url: string, data: any, accessToken: string = '') => {
    console.log(`Updating Data with Url: ${url}\n  Params: ${JSON.stringify(data)}`)
    let error: boolean = false
    let apiErrorResponse: ApiResponse = new ApiResponse()
    const options: AxiosRequestConfig = {
      method: 'put',
      headers: { 'content-type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${accessToken}` },
      data: JSON.stringify(data),
      url,
    }

    const apiResponse: any = await axios(options)
      .catch((x) => {
        error = true
        apiErrorResponse = ApiResponse.Parse(x.response.data, x.response.status)
      })
    if (error)
      return apiErrorResponse
    else
      return ApiResponse.Parse(apiResponse.data, apiResponse.status)
  }

  static Patch = async (url: string, data: any, accessToken: string = '') => {
    // console.log("Updating Data with Url: " + url + "\n  Params: " + JSON.stringify(data));
    let error: boolean = false
    let apiErrorResponse: ApiResponse = new ApiResponse()
    const options: AxiosRequestConfig = {
      method: 'patch',
      headers: { 'content-type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${accessToken}` },
      data: JSON.stringify(data),
      url,
    }

    const apiResponse: any = await axios(options)
      .catch((x) => {
        error = true
        apiErrorResponse = ApiResponse.Parse(x.response.data, x.response.status)
      })
    if (error)
      return apiErrorResponse
    else
      return ApiResponse.Parse(apiResponse.data, apiResponse.status)
  }

  static Delete = async (url: string, accessToken: string = '', data?: any) => {
    let error: boolean = false
    let apiErrorResponse: ApiResponse = new ApiResponse()

    const axiosResponse: any = await axios.delete(url, {
      data,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${accessToken}`,

      },
    }).catch((x) => {
      error = true
      apiErrorResponse = ApiResponse.Parse(x.response.data, x.response.status)
    })

    if (error)
      return apiErrorResponse
    else
      return ApiResponse.Parse(axiosResponse.data, axiosResponse.status)
  }

  static ModalPost = async (url: string, model: any) => {
    const options: AxiosRequestConfig = {
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(model),
      url,
    }
    return await axios(options)
  }
}
