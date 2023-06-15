export function formatPrice(value: number) {
  const splitted = String(value).split('.')
  return `R$ ${splitted[0] + ',' + splitted[1].padEnd(2, '0')}`
}
