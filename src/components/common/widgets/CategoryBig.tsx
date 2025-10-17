import { CATEGORY, getKoCategory } from '@/data/const/const';
import useCategory from '@/hooks/useCategory';
import { useModalStore } from '@/store/useModalStore';
import { useState } from 'react';

const CategoryBig = () => {
  const { isCategoryVisible, setIsCategoryVisible } = useModalStore();
  const { handleCategory, handleCategoryType } = useCategory();
  const [visableCateroy, setVisableCategory] = useState([
    {
      name: 'sea',
      isVisable: false,
    },
    {
      name: 'fresh',
      isVisable: false,
    },
    {
      name: 'supplies',
      isVisable: false,
    },
    {
      name: 'fashion',
      isVisable: false,
    },
    {
      name: 'etc',
      isVisable: false,
    },
  ]);

  const openCategory = (category: string) => {
    setVisableCategory((prev) =>
      prev.map((cate) =>
        cate.name === category
          ? { ...cate, isVisable: true }
          : { ...cate, isVisable: false }
      )
    );
  };

  const handleCategoryController = (category: string) => {
    if (category === 'sea' || category === 'fresh') {
      return;
    }

    handleCategory(category as keyof typeof CATEGORY, 'all');
    setIsCategoryVisible(false);
  };

  const handleSubController = (category: string, sub: string) => {
    handleCategory(category as keyof typeof CATEGORY, sub);
    setIsCategoryVisible(false);
  };

  const handleTypeController = (
    category: string,
    sub: string,
    type: string
  ) => {
    handleCategoryType(category as keyof typeof CATEGORY, sub, type);
    setIsCategoryVisible(false);
  };

  return (
    <>
      {isCategoryVisible && (
        <div
          className="fixed top-[80px] left-0 right-0 mx-auto w-[100%] bg-Grey-20 z-100"
          // onClick={() => {
          //   const setIsCategoryVisible =
          //     useModalStore.getState().setIsCategoryVisible;
          //   setIsCategoryVisible(false);
          // }}
        >
          <div className="p-10 ">
            <div className="relative flex flex-col gap-10">
              {Object.entries(CATEGORY).map(([category, subCategories]) => (
                <div
                  className="flex gap-4"
                  key={`category-${category}`}
                  onMouseEnter={() => openCategory(category)}
                  onClick={() => handleCategoryController(category)}
                >
                  <div className="flex-1 flex flex-col gap-3">
                    <div
                      className={`${visableCateroy.find((cate) => cate.name === category && cate.isVisable) ? 'text-Grey-90' : 'text-Grey-60'} text-2xl font-semibold`}
                      key={`category-${category}`}
                    >
                      {getKoCategory(category)}
                    </div>
                  </div>
                  <div className="flex-4 flex gap-3">
                    <div className="absolute top-0 left-[200px] flex gap-10">
                      {Object.entries(subCategories).map(
                        ([subCategory, type]) => (
                          <div
                            key={`subcategory-${subCategory}`}
                            className={`${visableCateroy.find((cate) => cate.name === category && cate.isVisable) ? 'block' : 'hidden'} w-[100px]`}
                          >
                            <div
                              onClick={() =>
                                handleSubController(category, subCategory)
                              }
                              className="text-lg font-semibold"
                            >
                              {getKoCategory(subCategory)}
                            </div>
                            <div className="pt-2 flex flex-col gap-2">
                              {type.map((t) => (
                                <div
                                  onClick={() =>
                                    handleTypeController(
                                      category,
                                      subCategory,
                                      t.value
                                    )
                                  }
                                  key={`type-${t.value}`}
                                >
                                  <div>{t.label}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryBig;
