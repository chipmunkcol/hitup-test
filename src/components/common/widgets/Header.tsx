import { useNavigate } from 'react-router-dom';
import CartIcon from '../../../assets/images/icon/CartIcon';
import ProfileIcon from '../../../assets/images/icon/ProfileIcon';
import HamburgerBtn from '../HamburgerBtn';
import Logo from '../Logo';
import SearchField from './SearchField';

const Header = () => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const goMain = () => {
    if (pathname === '/') {
      window.location.reload();
      return;
    }

    navigate('/');
  };

  const goCart = () => {
    navigate('/cart');
  };

  const goMypage = () => {
    navigate('/mypage');
  };

  return (
    <header className="p-[20px] flex justify-between">
      <div className="flex  items-center gap-[33px]">
        <HamburgerBtn />
        <Logo onClick={goMain} />
      </div>
      <div className="flex gap-[26px]">
        <div className="hidden md:block">
          <SearchField />
        </div>
        <div className="flex  items-center gap-[28px]">
          <div
            className="flex gap-[14px] items-center cursor-pointer"
            onClick={goMypage}
          >
            <ProfileIcon />
            <div className="hidden md:block">마이페이지</div>
          </div>
          <div
            className="flex gap-[12px] items-center cursor-pointer"
            onClick={goCart}
          >
            <CartIcon />
            <div className="hidden md:block">장바구니</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
