import { CATEGORY } from '@/data/const/const';
import type { CartItemWithChecked } from '@/hooks/useCart';

export function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function groupByBrand(items: CartItemWithChecked[]) {
  return items.reduce(
    (acc: { [brand: string]: CartItemWithChecked[] }, item) => {
      const brand = item['브랜드명'];
      if (!acc[brand]) {
        acc[brand] = [];
      }
      acc[brand].push(item);
      return acc;
    },
    {} as { [brand: string]: CartItemWithChecked[] }
  );
}

export function cutString(str: string, maxLength: number) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

type CategoryKey = keyof typeof CATEGORY;

export function getSubCategory(
  category: string | null,
  sub: string | null
): { value: string; label: string; fish: string[] }[] | null {
  if (!category || !sub) return null;
  if (!(category in CATEGORY)) return null;

  const categoryObj = CATEGORY[category as CategoryKey];
  if (!(sub in categoryObj)) return null;

  return categoryObj[sub as keyof (typeof CATEGORY)[CategoryKey]];
}
