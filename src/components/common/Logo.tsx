import logo from '../../assets/images/logo.png';

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="logo"
      className="w-[141px] h-[40px] cursor-pointer"
      onClick={onClick}
    />
  );
};

export default Logo;
