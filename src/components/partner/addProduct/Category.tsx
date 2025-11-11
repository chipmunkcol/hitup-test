import { CATEGORY, getKoCategory } from '@/data/const/const';
import useAddProductCategory from '@/hooks/partner/useAddProductCategory';

const Category = () => {
  const { category, fishList, onClickCategory, onClickFish } =
    useAddProductCategory();

  return (
    <div className="p-4 ">
      <div className="border border-Grey-30 rounded-md p-4">
        <div>카테고리</div>
        <div className="flex justify-between gap-2">
          <div className="flex-1 border border-Grey-30 rounded-md ">
            <div className=" p-2">대분류*</div>
            <ul>
              {Object.keys(CATEGORY)?.map((cate) => (
                <li
                  key={`category-대분류-${cate}`}
                  className={`${cate === category.category ? 'bg-Grey-20' : ''} p-2`}
                  onClick={() => onClickCategory('category', cate)}
                >
                  {getKoCategory(cate)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 border border-Grey-30 rounded-md ">
            <div className=" p-2">중분류*</div>
            <ul>
              {category.category &&
                Object.keys(CATEGORY[category.category])?.map((subCate) => (
                  <li
                    key={`category-대분류-${subCate}`}
                    className={`${subCate === category.subCategory ? 'bg-Grey-20' : ''} p-2`}
                    onClick={() => onClickCategory('subCategory', subCate)}
                  >
                    {getKoCategory(subCate)}
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex-1 border border-Grey-30 rounded-md ">
            <div className=" p-2">소분류*</div>
            <ul>
              {category.category &&
                category.subCategory &&
                (
                  CATEGORY[category.category] as Record<
                    string,
                    { value: string; label: string; fish: string[] }[]
                  >
                )[category.subCategory]?.map((type) => (
                  <li
                    key={`category-대분류-${type.value}`}
                    className={`${type.value === category.type ? 'bg-Grey-20' : ''} p-2`}
                    onClick={() => onClickCategory('type', type.value)}
                  >
                    {type.label}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* 어종 */}
        <div className="p-2">
          <div>어종 선택(중복 선택 가능)</div>
          <ul className="flex gap-2">
            {fishList &&
              fishList?.map((fish: string) => (
                <li key={`addproduct-fish-${fish}`} className="flex gap-1">
                  <input
                    onChange={() => onClickFish(fish)}
                    checked={category?.fish.includes(fish)}
                    type="checkbox"
                    id={`checkbox-fish-${fish}`}
                  />
                  <label htmlFor={`checkbox-fish-${fish}`}>{fish}</label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
