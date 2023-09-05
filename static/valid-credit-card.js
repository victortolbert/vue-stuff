/* eslint-disable no-cond-assign */
// takes the form field value and returns true on valid number
function valid_credit_card(value) {
  if (!value)
    return false

  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value))
    return false

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0
  const nDigit = 0
  let bEven = false

  value = value.replace(/\D/g, '')

  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n)
    let nDigit = Number.parseInt(cDigit, 10)

    if (bEven) {
      if ((nDigit *= 2) > 9)
        nDigit -= 9
    }

    nCheck += nDigit
    bEven = !bEven
  }

  return (nCheck % 10) === 0
}

function valid_credit_card2(value) {
  // Accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value))
    return false

  // The Luhn Algorithm. It's so pretty.
  let nCheck = 0
  value = value.replace(/\D/g, '')

  for (let n = 0; n < value.length; n++) {
    let nDigit = Number.parseInt(value[n], 10)

    if (!((n + value.length) % 2) && (nDigit *= 2) > 9)
      nDigit -= 9

    nCheck += nDigit
  }

  return (nCheck % 10) === 0
}
