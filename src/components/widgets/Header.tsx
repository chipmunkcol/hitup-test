import HamburgerBtn from '../common/HamburgerBtn';
import CartIcon from '../common/icon/CartIcon';
import ProfileIcon from '../common/icon/ProfileIcon';
import Logo from '../common/Logo';
import Searchbar from '../common/Searchbar';

const Header = () => {
  return (
    <header className="p-[20px] flex justify-between">
      <div className="flex  items-center gap-[33px]">
        <HamburgerBtn />
        <Logo />
      </div>
      <div className="flex gap-[26px]">
        <Searchbar />
        <div className="flex  items-center gap-[28px]">
          <div className="flex gap-[14px] items-center cursor-pointer">
            <ProfileIcon />
            <div>마이페이지</div>
          </div>
          <div className="flex gap-[12px] items-center cursor-pointer">
            <CartIcon />
            <div>장바구니</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
