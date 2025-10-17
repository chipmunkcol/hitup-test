import { useModalStore } from '@/store/useModalStore';
import hamburgerBtn from '@/assets/images/hamburger-button.png';
import cancelBtn from '@/assets/images/cancel.png';

// interface HamburgerBtnProps {
//   onClick?: () => void;
// }

const HamburgerBtn = () => {
  const toggleCategoryVisible = useModalStore(
    (state) => state.toggleCategoryVisible
  );
  const isCategoryVisible = useModalStore((state) => state.isCategoryVisible);

  return (
    <img
      onClick={toggleCategoryVisible}
      src={isCategoryVisible ? cancelBtn : hamburgerBtn}
      alt="hamburger"
      className="w-[32px] h-[32px] cursor-pointer"
    />
  );
};

export default HamburgerBtn;
