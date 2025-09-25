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
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
      {/* 높이를 고정시켜놓으면 사이드이펙트 발생함 min-h 사용할것 */}
      {/* <main className="h-[calc(100vh-80px)]">{children}</main> */}
      <Footer />
    </div>
  );
};

export default Layout;
