import { generalSettings } from 'settings'
import { store } from 'store'

function getBuyLink() {
  const globalState = store.getState()

  let utmMail
  try {
    const loggedUser = JSON.parse(globalState.auth.user)
    loggedUser.email && (utmMail = loggedUser.email)
  } catch (error) {
    console.warn('failed on setting utm')
  }

  try {
    const combinations = globalState.cart.items.map((i) => i.purchase_url + ':' + i.qty).join(',')
    const checkoutURL = new URL(generalSettings.checkout_base_url + '/' + combinations)
    utmMail && checkoutURL.searchParams.append('utm_email', utmMail)
    return checkoutURL.href
  } catch (error) {
    console.warn('Failed on generating checkout URL')
  }
}

export { getBuyLink }
