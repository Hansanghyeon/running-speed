export function inputFormatTextNumber(v: string) {
  const _value = v
    .replaceAll(/[^0-9]/g, '')
    .replace(/^(0+)(?=\d{2})/, '')
  return _value
}