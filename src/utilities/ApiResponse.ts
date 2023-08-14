export enum ResponseType {
  Error,
  Success,
  FailedValidation,
  NoRecords,
  BadRequest,
  Unauthorized,
  ConcurencyConflict,
  NoContent,
}

export class ApiResponse {
  public resultText: string | undefined
  public errors: string[] | undefined
  public result: ResponseType | undefined
  public showMore: boolean | undefined
  public totalCount: number | undefined
  public model: any
  static errorMessage = 'Were sorry! An error has occurred and has been sent to our I.T. team. If problem persists, please notifiy us by clicking the Report Bug link.  '

  public static Parse(data: any, status: number): ApiResponse {
    const apiResponse: ApiResponse = new ApiResponse()
    let result: any
    let resultText: string = ''
    let errors: any
    switch (Number(status)) {
      case 200:
        result = ResponseType.Success
        resultText = '200'
        break
      case 201:
        result = ResponseType.Success
        resultText = '201'
        break
      case 204:
        result = ResponseType.NoContent
        resultText = '204'
        break
      case 400:
        result = ResponseType.BadRequest
        resultText = data
        errors = data.errors
        data = null
        break
      case 401:
        result = ResponseType.Unauthorized
        resultText = data
        data = null
        break
      case 404:
        resultText = data
        if (resultText === '')
          result = ResponseType.BadRequest

        else
          result = ResponseType.NoRecords

        data = null
        break
      case 409:
        result = ResponseType.ConcurencyConflict
        resultText = data
        data = null
        break
      case 418:
        result = ResponseType.FailedValidation
        resultText = data
        data = null
        break
      case 500:
        result = ResponseType.Error
        resultText = '500'
        break
    }
    apiResponse.result = result
    apiResponse.resultText = resultText
    apiResponse.model = data || null
    apiResponse.errors = errors

    console.log('apiResponse.result: ', apiResponse.result)
    console.log('apiResponse.resultText: ', apiResponse.resultText)
    console.table(apiResponse.model)

    if (apiResponse.errors?.length)
      console.error(apiResponse.errors)

    return apiResponse
  }
}
