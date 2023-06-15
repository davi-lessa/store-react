import { generalSettings } from 'settings'
import { store } from 'store'

function getBuyLink() {
  const globalState = store.getState()

  let utmMail
  let utmName
  let customerToken
  try {
    const loggedUser = JSON.parse(globalState.auth.user)
    loggedUser.email && (utmMail = loggedUser.email)
    loggedUser.displayName && (utmName = loggedUser.displayName)
    customerToken = globalState.auth.ct
  } catch (error) {
    console.warn('failed on setting utm')
  }

  try {
    const checkoutURL = new URL(generalSettings.checkout_base_url)
    checkoutURL.searchParams.append('clearCart', '1')
    checkoutURL.searchParams.append('skipToCheckout', '1')
    checkoutURL.searchParams.append('redirectTo', 'checkout')
    // checkoutURL.searchParams.append('store_token', '3ce8167e3084d969bb453585b20dd1660c2e06c4')

    globalState.cart.items.forEach((item, index) => {
      checkoutURL.searchParams.append(`product_option_id[${index}]`, String(item.id))
      checkoutURL.searchParams.append(`quantity[${index}]`, String(item.qty))
      if (!item.allow_sell_without_customization)
        item.customizations.data.forEach((customization) => {
          checkoutURL.searchParams.append(`customization[${item.id}][${customization.id}]`, String(customization.values[0]))
        })
    })

    const combinations = globalState.cart.items.map((i) => i.purchase_url + ':' + i.qty).join(',')
    checkoutURL.searchParams.append('tokenReference', combinations)

    // checkoutURL.searchParams.append('customization[49917396][3152]', 'Sim: pipeta 3ml')
    !customerToken && utmName && checkoutURL.searchParams.append('utm_name', utmName)
    !customerToken && utmMail && checkoutURL.searchParams.append('utm_email', utmMail)

    customerToken && checkoutURL.searchParams.append('customerToken', customerToken)

    return checkoutURL.href
  } catch (error) {
    console.warn('Failed on generating checkout URL')
  }
}

export { getBuyLink }
