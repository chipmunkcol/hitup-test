import { CATEGORY } from '@/data/const/const';
import { useState } from 'react';

type typeCategory = {
  category: keyof typeof CATEGORY | '';
  subCategory: string;
  type: string;
  fish: string[];
};

const useAddProductCategory = () => {
  const [category, setCategory] = useState<typeCategory>({
    category: '',
    subCategory: '',
    type: '',
    fish: [],
  });

  const fishList =
    category.category && category.subCategory && category.type
      ? (((
          CATEGORY[category.category] as Record<
            string,
            { value: string; label: string; fish: string[] }[]
          >
        )[category.subCategory]?.filter((v) => v.value === category.type) ??
          [])[0]?.fish ?? [])
      : [];

  const onClickCategory = (name: string, value: string) => {
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const onClickFish = (fish: string) => {
    const newCategory = { ...category };
    if (category.fish.includes(fish)) {
      newCategory.fish = newCategory.fish.filter((f) => f !== fish);
      setCategory(newCategory);
    } else {
      newCategory.fish = [...newCategory.fish, fish];
      setCategory(newCategory);
    }
  };

  return {
    category,
    fishList,
    onClickCategory,
    onClickFish,
  };
};

export default useAddProductCategory;
