import { useNavigate } from 'react-router-dom';

import ProductCard from '../components/common/ProductCard';
import More from '../components/common/widgets/More';
import Tab from '../components/common/widgets/Tab';
import { 신상품 } from '../data/cardData';

import img1 from '../assets/images/Banner_carousel_desktop1.png';
import img2 from '../assets/images/Banner_carousel_desktop2.png';
import { Carousel } from '../components/common/libs/carousel/Carousel';

const slides = [img1, img2];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <Tab />
      <div className="w-full h-[440px] bg-Bgrey-40">
        <Carousel images={slides} />
      </div>
      <More
        title="신상품 특가"
        description="새롭게 입고된 상품을 지금 만나보세요!"
        path="/new"
      />
      <div className=" py-[20px]">
        <ul className="flex justify-center gap-[20px]">
          {신상품.map((item) => (
            <li
              key={`신상품-${item.id}`}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <ProductCard label="new" color="blue" data={item} />
            </li>
          ))}
        </ul>
      </div>
      <More
        title="인기 상품"
        description="히트업 최고 인기 상품을 만나보세요!"
        path="/best"
      />
      <div className=" py-[20px]">
        <ul className="flex justify-center gap-[20px]">
          {신상품.map((item, index) => (
            <li
              key={`인기상품-${item.id}`}
              onClick={() => navigate(`/product/${item.id}`)}
            >
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
