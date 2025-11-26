import { useNavi } from '@/hooks/useNavi';
import CartIcon from '../../../assets/images/icon/CartIcon';
import ProfileIcon from '../../../assets/images/icon/ProfileIcon';
import HamburgerBtn from '../../atoms/HamburgerBtn';
import Logo from '../../atoms/Logo';

const Header = () => {
  const { goHome, goCart, goMypage } = useNavi();

  const pathname = window.location.pathname;

  const goMain = () => {
    if (pathname === '/') {
      window.location.reload();
      return;
    }

    goHome();
  };

  return (
    <header className="p-[20px] flex justify-between">
      <div className="flex  items-center gap-[33px]">
        <HamburgerBtn />
        <Logo onClick={goMain} />
      </div>
      {/* <div className="flex gap-2">
        <Button onClick={() => navigate('/partner/login')}>
          파트너스 로그인(new!)
        </Button>
        <Button onClick={goAddProduct}>파트너스 상품</Button>
      </div> */}
      <div className="flex gap-[26px]">
        {/* <div className="hidden md:block">
          <SearchField />
        </div> */}
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
