import { CATEGORY, getKoCategory } from '@/data/const/const';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const fish = searchParams.get('fish');
  const [isSeaOpen, setIsSeaOpen] = useState(false);
  const [isFreshOpen, setIsFreshOpen] = useState(false);

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

  type CategoryKey = keyof typeof CATEGORY;

  function getSubCategory(
    category: string | null,
    sub: string | null
  ): { value: string; label: string; fish: string[] }[] | null {
    if (!category || !sub) return null;
    if (!(category in CATEGORY)) return null;

    const categoryObj = CATEGORY[category as CategoryKey];
    if (!(sub in categoryObj)) return null;

    return categoryObj[sub as keyof (typeof CATEGORY)[CategoryKey]];
  }

  const subCategory = getSubCategory(category, sub);

  const handleCategory = (category: CategoryKey, sub: string) => {
    navigate(`/category/${category}/sub/${sub}?type=all`);
  };

  const fishList = subCategory?.find((item) => item.value === type)?.fish || [];
  console.log('fishList: ', fishList);

  const handleType = (type: string) => {
    setSearchParams({ type });
  };

  const handleFish = (fish: string) => {
    setSearchParams({ type: type!, fish });
  };

  return (
    <>
      <div className="w-full h-[40px] flex items-center justify-around bg-Grey-70 text-Grey-05">
        <div
          onMouseEnter={() => setIsSeaOpen(true)}
          onMouseLeave={() => setIsSeaOpen(false)}
          className="relative"
        >
          <div
            className={`w-[100px] ${category === 'sea' ? 'text-Blue-20' : ''}`}
          >
            바다
          </div>
          {isSeaOpen && (
            <div className="absolute z-10 top-[20px] left-0 w-[100px] h-[120px] bg-Grey-70 text-Grey-05 shadow-md flex flex-col items-center justify-center gap-2">
              {CATEGORY['sea'] &&
                Object.keys(CATEGORY['sea']).map((sub) => (
                  <div
                    key={`category-sea-${sub}`}
                    onClick={() => {
                      handleCategory('sea', sub);
                      setIsSeaOpen(false);
                    }}
                  >
                    {getKoCategory(sub)}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div
          onMouseEnter={() => setIsFreshOpen(true)}
          onMouseLeave={() => setIsFreshOpen(false)}
          className="relative "
        >
          <div
            className={`w-[100px] ${category === 'fresh' ? 'text-Blue-20' : ''}`}
          >
            민물
          </div>
          {isFreshOpen && (
            <div className="absolute z-10 top-[20px] left-0 w-[100px] h-[120px] bg-Grey-70 text-Grey-05 shadow-md flex flex-col items-center justify-center gap-2">
              {CATEGORY['fresh'] &&
                Object.keys(CATEGORY['fresh']).map((sub) => (
                  <div
                    key={`category-fresh-${sub}`}
                    className="w-full text-center"
                    onClick={() => {
                      handleCategory('fresh', sub);
                      setIsFreshOpen(false);
                    }}
                  >
                    {getKoCategory(sub)}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div
          className={`w-[100px] ${category === 'supplies' ? 'text-Blue-20' : ''}`}
          onClick={() => handleCategory('supplies', 'all')}
        >
          소품
        </div>
        <div
          className={`w-[100px] ${category === 'fashion' ? 'text-Blue-20' : ''}`}
          onClick={() => handleCategory('fashion', 'all')}
        >
          의류/패션/잡화
        </div>
        <div
          className={`w-[100px] ${category === 'etc' ? 'text-Blue-20' : ''}`}
          onClick={() => handleCategory('etc', 'all')}
        >
          기타
        </div>
      </div>

      {/* 카테고리 중분류 */}
      {subCategory && (
        <div className="py-4 px-10 flex gap-10 justify-start">
          {subCategory.map((item: { value: string; label: string }) => (
            <div
              key={item.value}
              className="flex items-center justify-center rounded-xl cursor-pointer"
              style={{
                color:
                  type === 'all' && item.value === 'all'
                    ? 'blue'
                    : type === item.value
                      ? 'blue'
                      : 'black',
              }}
              onClick={() => handleType(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {/* 어종 정리 */}
      {/* subCategory 에서 전체를 선택했다면 전부보여주고 아니면 category에서 subCategory['key'] 형태로 돌려야함 */}
      {subCategory && (
        <div className="py-4 px-10 flex gap-10 justify-start">
          {fishList.length > 0 &&
            fishList.map((fish) => (
              <div
                onClick={() => handleFish(fish)}
                key={fish}
                className="flex flex-col gap-2"
              >
                <div className="w-[50px] h-[50px] bg-Grey-20 rounded-full flex justify-center items-center">
                  🐟
                </div>
                <div>{fish}</div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
