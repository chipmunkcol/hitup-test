import { useNavigate } from 'react-router-dom';
import HamburgerBtn from '../HamburgerBtn';
import CartIcon from '../icon/CartIcon';
import ProfileIcon from '../icon/ProfileIcon';
import Logo from '../Logo';
import SearchField from './SearchField';

const Header = () => {
  const navigate = useNavigate();
  const goMain = () => {
    navigate('/');
  };

  const goCart = () => {
    navigate('/cart');
  };

  return (
    <header className="p-[20px] flex justify-between">
      <div className="flex  items-center gap-[33px]">
        <HamburgerBtn />
        <Logo onClick={goMain} />
      </div>
      <div className="flex gap-[26px]">
        {/* <Searchbar /> */}
        <SearchField />
        <div className="flex  items-center gap-[28px]">
          <div className="flex gap-[14px] items-center cursor-pointer">
            <ProfileIcon />
            <div>마이페이지</div>
          </div>
          <div
            className="flex gap-[12px] items-center cursor-pointer"
            onClick={goCart}
          >
            <CartIcon />
            <div>장바구니</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
