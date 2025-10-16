import { CATEGORY, getKoCategory } from '@/data/const/const';
import useCategory from '@/hooks/useCategory';

const Category = () => {
  // const navigate = useNavigate();
  const {
    isSeaOpen,
    openSea,
    closeSea,
    isFreshOpen,
    openFresh,
    closeFresh,
    category,

    type,
    subCategory,
    handleCategory,
    handleType,
    handleFish,
    fishList,
  } = useCategory();
  return (
    <>
      <div className="w-full h-[40px] flex items-center justify-around bg-Grey-70 text-Grey-05">
        <div
          onMouseEnter={openSea}
          onMouseLeave={closeSea}
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
                      closeSea();
                    }}
                  >
                    {getKoCategory(sub)}
                  </div>
                ))}
            </div>
          )}
        </div>
        <div
          onMouseEnter={openFresh}
          onMouseLeave={closeFresh}
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
                      closeFresh();
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
