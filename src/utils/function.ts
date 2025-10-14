export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function groupByBrand(items: any[]) {
  return items.reduce((acc, item) => {
    const brand = item['브랜드명'];
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(item);
    return acc;
  }, {});
}

export function cutString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}
