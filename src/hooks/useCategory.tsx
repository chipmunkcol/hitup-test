import type { CATEGORY } from '@/data/const/const';
import { getSubCategory } from '@/utils/function';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useCategory = () => {
  const navigate = useNavigate();

  const [isFreshOpen, setIsFreshOpen] = useState(false);
  const [isSeaOpen, setIsSeaOpen] = useState(false);
  const openSea = () => setIsSeaOpen(true);
  const closeSea = () => setIsSeaOpen(false);
  const openFresh = () => setIsFreshOpen(true);
  const closeFresh = () => setIsFreshOpen(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const fish = searchParams.get('fish');

  const pathname = window.location.pathname;
  // console.log('pathname, type: ', pathname, type, fish);

  const category =
    pathname?.split('/')[
      pathname?.split('/')?.findIndex((v) => v === 'category') + 1
    ];
  const sub =
    pathname?.split('/')[
      pathname?.split('/')?.findIndex((v) => v === 'sub') + 1
    ];

  const subCategory = getSubCategory(category, sub);

  const handleCategory = (category: keyof typeof CATEGORY, sub: string) => {
    navigate(`/category/${category}/sub/${sub}?type=all`);
  };

  const handleType = (type: string) => {
    setSearchParams({ type });
  };

  const handleFish = (fish: string) => {
    setSearchParams({ type: type!, fish });
  };

  const fishList = subCategory?.find((item) => item.value === type)?.fish || [];
  // console.log('fishList: ', fishList);

  return {
    isSeaOpen,
    openSea,
    closeSea,
    isFreshOpen,
    openFresh,
    closeFresh,

    category,
    sub,
    type,
    fish,
    subCategory,
    handleCategory,
    handleType,
    handleFish,
    fishList,
  };
};

export default useCategory;
