import type { ReactNode } from 'react';
import Footer from '../widgets/Footer';
import Header from '../widgets/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Header />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
