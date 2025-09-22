import HamburgerBtn from '../components/common/HamburgerBtn';
import Logo from '../components/common/Logo';
import ProductCard from '../components/common/ProductCard';
import Searchbar from '../components/common/Searchbar';
import Header from '../components/widgets/Header';
import Tab from '../components/widgets/Tab';

const HomePage = () => {
  return (
    <div className=" bg-Grey-30 min-h-screen">
      <Tab />
      <ProductCard />
      <Logo />
      <HamburgerBtn />
      <Searchbar />
      <Header />
    </div>
  );
};

export default HomePage;
