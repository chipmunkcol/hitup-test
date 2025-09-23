import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import Tab from '../components/common/widgets/Tab';
import { 신상품 } from '../data/cardData';
import { TYPOGRAPHY } from '../styles/typography';
import { Carousel } from '../components/common/libs/Carousel';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Tab />
      <div className="w-full h-[440px] bg-Bgrey-40">
        <Carousel />
      </div>
      <div className="px-[24px]">
        <div className="py-[12px] flex justify-between items-center">
          <div className={TYPOGRAPHY.Heading28Bold}>신상품 특가</div>
          <div
            className={`text-Grey-70 ${TYPOGRAPHY.Heading222Medium}`}
            onClick={() => navigate('/new')}
          >
            더보기 {'>'}
          </div>
        </div>
        <div className={`text-Grey-60 ${TYPOGRAPHY.Heading222Semi} py-[12px]`}>
          새롭게 입고된 상품을 지금 만나보세요!
        </div>
      </div>
      <div className=" py-[20px]">
        <ul className="flex justify-center gap-[20px]">
          {신상품.map((item) => (
            <li>
              <ProductCard label="new" color="blue" data={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className="px-[24px]">
        <div className="py-[12px] flex justify-between items-center">
          <div>인기 상품</div>
          <div onClick={() => navigate('/best')}>더보기 {'>'}</div>
        </div>
        <div className="py-[12px]">
          인기 상품 더보기 히트업 최고 인기 상품을 만나보세요!
        </div>
      </div>
      <div className=" py-[20px]">
        <ul className="flex justify-center gap-[20px]">
          {신상품.map((item, index) => (
            <li>
              <ProductCard
                label={String(index + 1)}
                color="black"
                data={item}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
