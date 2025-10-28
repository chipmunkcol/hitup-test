import type { ReactNode } from 'react';
import Footer from '../widgets/Footer';
import Header from '../widgets/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    // body를 전체 화면으로 하고 main은 flex-1으로 조절 (main height 영역이 적을 경우 footer 보이게)
    // <div className="max-w-[1280px] mx-auto flex flex-col min-h-screen">
    <div className="max-w-[1280px] mx-auto flex flex-col">
      <Header />
      {/* <main className="flex-1 relative">{children}</main> */}
      <main className="relative min-h-[calc(100vh-80px)]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
