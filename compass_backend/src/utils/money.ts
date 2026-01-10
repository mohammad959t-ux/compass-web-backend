export function toCurrency(value: number) {
  return `$${Number(value).toLocaleString()}`;
}

export function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}
