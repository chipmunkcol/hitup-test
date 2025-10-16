import ProductCard from '@/components/common/ProductCard';
import Category from '@/components/common/widgets/Category';
import { 신상품 } from '@/data/cardData';
import { getSubCategory } from '@/utils/function';
import { Select } from 'antd';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const fish = searchParams.get('fish');

  const pathname = window.location.pathname;
  console.log('pathname, type: ', pathname, type, fish);

  const category =
    pathname?.split('/')[
      pathname?.split('/')?.findIndex((v) => v === 'category') + 1
    ];
  const sub =
    pathname?.split('/')[
      pathname?.split('/')?.findIndex((v) => v === 'sub') + 1
    ];

  // pathname & params 활용해서 useQuery 상품 불러오기 (대분류, 중분류, 타입, 어종) & 정렬
  // 예상 API /products?category=sea&sub=ship&type=all&fish=갑오징어&sort=popularity

  const subCategory = getSubCategory(category, sub);

  const fishList = subCategory?.find((item) => item.value === type)?.fish || [];
  console.log('fishList: ', fishList);

  // 정렬 (인기순, 최신순, 낮은가격순, 높은가격순)
  const [sort, setSort] = useState('popularity');
  console.log('sort: ', sort);
  const onChangeSort = (value: string) => {
    setSort(value);
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

export default CategoryPage;
