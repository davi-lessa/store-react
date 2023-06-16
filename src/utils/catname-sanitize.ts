export default function sanitizeCatName(input: string) {
  return input
    ?.replace(/[\u0300-\u036f]/g, '')
    ?.replace(/\s+/g, '-')
    ?.toLowerCase()
}
