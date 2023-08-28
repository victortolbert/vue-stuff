declare interface Window {
  // extend the window
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace Accept {
  interface AuthData {
    clientKey: string
    apiLoginID: string
  }

  interface CardData {
    cardNumber: string
    month: string
    year: string
    cardCode?: string
    zip?: string
    fullName?: string
  }

  interface BankData {
    accountNumber: string
    routingNumber: string
    nameOnAccount: string
    accountType: 'checking' | 'savings' | 'businessChecking'
  }

  interface IError<C extends string, T extends string> {
    code: C
    text: T
  }

  type Error =
    | IError<'I_WC_01', 'Successful.'>
    | IError<'E_WC_01', 'Please include Accept.js library from CDN.'>
    | IError<'E_WC_02', 'A HTTPS connection is required.'>
    | IError<'E_WC_03', 'Accept.js is not loaded correctly.'>
    | IError<'E_WC_04', 'Please provide mandatory field to library.'>
    | IError<'E_WC_05', 'Please provide valid credit card number.'>
    | IError<'E_WC_06', 'Please provide valid expiration month.'>
    | IError<'E_WC_07', 'Please provide valid expiration year.'>
    | IError<
      'E_WC_08',
      'If card information is provided, the expiration date (month and year) must be in the future.'
    >
    | IError<'E_WC_10', 'Please provide valid apiLoginID.'>
    | IError<'E_WC_13', 'Invalid Fingerprint.'>
    | IError<'E_WC_14', 'Accept.js encryption failed.'>
    | IError<'E_WC_15', 'Please provide valid CVV.'>
    | IError<'E_WC_16', 'Please provide valid ZIP code.'>
    | IError<'E_WC_17', 'Please provide valid card holder name.'>
    | IError<'E_WC_18', 'Client Key is required.'>
    | IError<
      'E_WC_19',
      'An error occurred during processing. Please try again.'
    >
    | IError<
      'E_WC_21',
      'User authentication failed due to invalid authentication values.'
    >
    | IError<
      'E_WC_23',
      'Please provide either card information or bank information'
    >
    | IError<'E_WC_24', 'Please provide valid account number.'>
    | IError<'E_WC_25', 'Please provide valid routing number.'>
    | IError<'E_WC_26', 'Please provide valid account holder name.'>
    | IError<'E_WC_27', 'Please provide valid account type.'>

  interface Response {
    opaqueData: {
      dataDescriptor: string
      dataValue: string
      cardNumber?: string
      expData?: string
      firstName?: string
      lastName?: string
    }
    messages: {
      resultCode: 'Ok' | 'Error'
      message: Error[]
    }
    encryptedCardData?: {
      cardNumber: string
      expData: string
      bin: string
    }

    customerInformation?: {
      string: string
    }
  }

  type ResponseHandler = (response: Response) => void

  function dispatchData(
    payload: {
      authData: AuthData
      cardData: CardData
    },
    handler: ResponseHandler
  ): void
}
