import { CATEGORY } from '@/data/const/const';
import type { CartItemWithChecked } from '@/hooks/useCart';
import type { FormInstance } from 'antd';

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

export function alertComingSoon() {
  alert('Coming soon!');
}

export function detectLanguage(str: string) {
  // 한글 정규식: 가-힣
  const hasKorean = /[가-힣]/.test(str);
  // 영어 정규식: a-zA-Z
  const hasEnglish = /[a-zA-Z]/.test(str);

  if (hasKorean && !hasEnglish) return 'ko'; // 한국어
  if (hasEnglish && !hasKorean) return 'en'; // 영어
  if (hasKorean && hasEnglish) return 'mixed'; // 혼합
  return 'other'; // 숫자, 기호 등
}

export const convertTextTo상품상세참조 = (
  상품상세: boolean,
  form: FormInstance<any>
) => {
  const productGroup = form.getFieldValue('disclosureProductGroup');
  switch (productGroup) {
    case '스포츠':
      if (상품상세) {
        form.setFieldValue('sports-productName', '상품상세 참조');
        form.setFieldValue('disclosureModelName', '상품상세 참조');
        form.setFieldValue('disclosureKCCertificationNumber', '상품상세 참조');
        form.setFieldValue('disclosureSize', '상품상세 참조');
        form.setFieldValue('disclosureWeight', '상품상세 참조');
        form.setFieldValue('disclosureColor', '상품상세 참조');
        form.setFieldValue('disclosureMaterial', '상품상세 참조');
        form.setFieldValue('disclosureProductComposition', '상품상세 참조');

        // Radio 값 변경 -> Input 값 변경
        form.setFieldValue('disclosureReleaseDate', '상품상세 참조');
        form.setFieldValue('disclosureManufacturer', '상품상세 참조');
        form.setFieldValue('disclosureProductSpecification', '상품상세 참조');
        form.setFieldValue('disclosureWarrantyStandard', '상품상세 참조');
        form.setFieldValue('disclosureASContact', '상품상세 참조');
      } else {
        form.setFieldValue('sports-productName', '');
        form.setFieldValue('disclosureModelName', '');
        form.setFieldValue('disclosureKCCertificationNumber', '');
        form.setFieldValue('disclosureSize', '');
        form.setFieldValue('disclosureWeight', '');
        form.setFieldValue('disclosureColor', '');
        form.setFieldValue('disclosureMaterial', '');
        form.setFieldValue('disclosureProductComposition', '');
        form.setFieldValue('disclosureReleaseDate', '');
        form.setFieldValue('disclosureManufacturer', '');
        form.setFieldValue('disclosureProductSpecification', '');
        form.setFieldValue('disclosureWarrantyStandard', '');
        form.setFieldValue('disclosureASContact', '');
      }
      break;
    // 다른 상품군에 대한 처리 추가 가능
    case '의류':
      if (상품상세) {
        form.setFieldValue('clothes-material', '상품상세 참조');
        form.setFieldValue('clothes-color', '상품상세 참조');
        form.setFieldValue('clothes-size', '상품상세 참조');
        form.setFieldValue('clothes-manufacturer', '상품상세 참조');
        form.setFieldValue('clothes-careInstructions', '상품상세 참조');
        form.setFieldValue('disclosureReleaseDate', '상품상세 참조');
        form.setFieldValue('clothes-warrantyStandard', '상품상세 참조');
        form.setFieldValue('clothes-asContact', '상품상세 참조');
      } else {
        form.setFieldValue('clothes-material', '');
        form.setFieldValue('clothes-color', '');
        form.setFieldValue('clothes-size', '');
        form.setFieldValue('clothes-manufacturer', '');
        form.setFieldValue('clothes-careInstructions', '');
        form.setFieldValue('disclosureReleaseDate', '');
        form.setFieldValue('clothes-warrantyStandard', '');
        form.setFieldValue('clothes-asContact', '');
      }
      break;

    case '신발':
      if (상품상세) {
        form.setFieldValue('shoes-material', '상품상세 참조');
        form.setFieldValue('shoes-color', '상품상세 참조');
        form.setFieldValue('shoes-length', '상품상세 참조');
        form.setFieldValue('shoes-heelHeight', '상품상세 참조');
        form.setFieldValue('shoes-manufacturer', '상품상세 참조');
        form.setFieldValue('shoes-careInstructions', '상품상세 참조');
        form.setFieldValue('shoes-warrantyStandard', '상품상세 참조');
        form.setFieldValue('shoes-asContact', '상품상세 참조');
      } else {
        form.setFieldValue('shoes-material', '');
        form.setFieldValue('shoes-color', '');
        form.setFieldValue('shoes-length', '');
        form.setFieldValue('shoes-heelHeight', '');
        form.setFieldValue('shoes-manufacturer', '');
        form.setFieldValue('shoes-careInstructions', '');
        form.setFieldValue('shoes-warrantyStandard', '');
        form.setFieldValue('shoes-asContact', '');
      }
      break;

    case '상품권':
      if (상품상세) {
        form.setFieldValue('giftcard-issuer', '상품상세 참조');
        form.setFieldValue('giftcard-validityPeriod', '상품상세 참조');
        form.setFieldValue('giftcard-usageConditions', '상품상세 참조');
        form.setFieldValue('giftcard-fullRefundConditions', '상품상세 참조');
        form.setFieldValue('giftcard-customerServiceContact', '상품상세 참조');
      } else {
        form.setFieldValue('giftcard-issuer', '');
        form.setFieldValue('giftcard-validityPeriod', '');
        form.setFieldValue('giftcard-usageConditions', '');
        form.setFieldValue('giftcard-fullRefundConditions', '');
        form.setFieldValue('giftcard-customerServiceContact', '');
      }
      break;
    // case: '기타재화'

    default:
      break;
  }
};
