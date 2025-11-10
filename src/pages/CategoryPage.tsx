import ProductCard from '@/components/atoms/ProductCard';
import Category from '@/components/common/widgets/Category';
import { 신상품 } from '@/data/cardData';
import { Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  // pathname & params 활용해서 useQuery 상품 불러오기 (대분류, 중분류, 타입, 어종) & 정렬
  // 예상 API /products?category=sea&sub=ship&type=all&fish=갑오징어&sort=popularity

  // 정렬 (인기순, 최신순, 낮은가격순, 높은가격순)
  const [sort, setSort] = useState('popularity');
  console.log('sort: ', sort);
  const onChangeSort = (value: string) => {
    setSort(value);
  };

  const navigate = useNavigate();
  const goProductDetail = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="w-full">
      {/* 카테고리 컴포넌트 (대분류 / 중분류 / 타입 / 물고기) */}
      <Category />

      {/* 정렬 (인기순, 최신순, 낮은가격순, 높은가격순) */}
      <div className="flex justify-end">
        <Select
          value={sort}
          defaultValue="popularity"
          style={{ width: 110 }}
          onChange={onChangeSort}
          options={[
            { value: 'popularity', label: '인기순' },
            { value: 'newest', label: '최신순' },
            { value: 'lowPrice', label: '낮은가격순' },
            { value: 'highPrice', label: '높은가격순' },
          ]}
        />
      </div>

      {/* 상품 이미지 */}
      <div className=" py-[20px]">
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 justify-center gap-[20px]">
          {신상품.map((item, index) => (
            <li
              key={`신상품-${item.id}`}
              onClick={() => goProductDetail(item.id)}
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

export default CategoryPage;
