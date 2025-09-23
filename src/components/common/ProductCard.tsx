import type { Product } from '../../data/cardData';
import { TYPOGRAPHY } from '../../styles/typography';
import { formatNumber } from '../../utils/function';

interface ProductCardProps {
  label: string;
  color?: 'blue' | 'red' | 'black' | 'grey' | 'none';
  data: Product;
}

const ProductCard = ({ label, color = 'none', data }: ProductCardProps) => {
  const { title, description, price, discountRate, img, freeShipping } = data;

  const colors = {
    blue: 'var(--color-HITUP_Blue)',
    red: 'var(--color-HITUP_Red)',
    grey: 'var(--color-Grey-70)',
    black: 'var(--color-black)',
    none: 'transparent',
  };

  const discountedPirce = price - (price * discountRate) / 100;

  return (
    <div className="w-[220px] flex flex-col gap-[12px]">
      <div className="relative w-full h-[240px]  ">
        <div className="absolute top-0 left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <path
              d="M80 0H12C5.37258 0 0 5.37258 0 12V80L80 0Z"
              fill={` ${colors[color]}`}
            />
          </svg>
          <div className="absolute top-[12px] left-[12px] ">
            <span className={`${TYPOGRAPHY.Subheading16Bold} text-white`}>
              {label}
            </span>
          </div>
        </div>
        <img
          src={img}
          alt="product image"
          className="rounded-[20px] bg-white w-full h-full object-cover "
        />
      </div>
      <div className="flex flex-col gap-[8px] px-[8px]">
        <div className="flex flex-col gap-[12px]">
          <div className={TYPOGRAPHY.Subheading16Bold}>{title}</div>
          <div className={TYPOGRAPHY.Subheading16Medium}>{description}</div>
        </div>
        <div className="flex flex-col gap-[4px]">
          <div
            className={`${TYPOGRAPHY.Subheading16Medium} text-Grey-60  line-through`}
          >
            {formatNumber(price)}원
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[16px]">
              <div className={`text-HITUP_Red ${TYPOGRAPHY.Heading318Bold}`}>
                {discountRate}%
              </div>
              <div className={`${TYPOGRAPHY.Heading318Bold}`}>
                {formatNumber(discountedPirce)}원
              </div>
            </div>
            {freeShipping && (
              <div
                className={`flex items-center justify-center py-[2px] px-[8px] text-white bg-HITUP_Blue rounded-[12px] ${TYPOGRAPHY.Label12Bold}`}
              >
                무료배송
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

//                         <div className="absolute top-1/2">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="56" height="2" viewBox="0 0 56 2" fill="none">
// <path d="M0 1H56" stroke="#9A9A9A"/>
// </svg>
