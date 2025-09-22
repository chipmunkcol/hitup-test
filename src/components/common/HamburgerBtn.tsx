import hamburgerBtn from '../../assets/images/hamburger-button.png';

interface HamburgerBtnProps {
  onClick?: () => void;
}

const HamburgerBtn = ({ onClick }: HamburgerBtnProps) => {
  return (
    <img
      onClick={onClick}
      src={hamburgerBtn}
      alt="hamburger"
      className="w-[32px] h-[32px]"
    />
  );
};

export default HamburgerBtn;
