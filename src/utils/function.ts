export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}
