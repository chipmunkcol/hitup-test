import logo from '../../assets/images/logo.png';

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <img
      src={logo}
      alt="logo"
      className="w-[141px] h-[40px]"
      onClick={onClick}
    />
  );
};

export default Logo;
