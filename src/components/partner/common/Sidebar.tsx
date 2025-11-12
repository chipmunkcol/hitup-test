import { useNavi } from '@/hooks/useNavi';
import { useAuthStore } from '@/store/partner/useAuthStore';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const partnerAuth = useAuthStore((state) => state.partnerAuth);

  const [isHidden, setIsHidden] = useState(false);

  const toggleSidebar = () => {
    setIsHidden(!isHidden);
  };

  const hiddenSidebar = () => {
    setIsHidden(true);
  };

  const showSidebar = () => {
    setIsHidden(false);
  };

  // 상품관리 토글 기능
  const pathname = window.location.pathname;
  console.log('pathname: ', pathname);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const toggleProduct = () => {
    setIsProductOpen(!isProductOpen);
  };
  const { goDashboard, goAddProduct } = useNavi();

  const 상품관리카테고리 = [
    { name: '상품 조회/수정', onClick: () => {} },
    { name: '상품 등록', onClick: goAddProduct },
  ];

  //

  return (
    <div className="h-full w-full ">
      <div className="h-full flex">
        <div
          className={`relative transition-all duration-500 ${isHidden ? 'w-[30px]' : 'w-[330px]'} `}
        >
          <div
            className={`fixed transition-all duration-500 ${isHidden ? ' -left-[300px]' : 'left-0'} w-[330px] h-full bg-blue-950 text-white`}
          >
            <div className="p-10 flex flex-col gap-10">
              <div className="flex justify-between">
                <div className="">히트업몰 파트너</div>
                <div
                  className={`${isHidden ? 'opacity-0' : 'opacity-100'}`}
                  onClick={toggleSidebar}
                >
                  {'[<]'}
                </div>
              </div>
              <div className=" flex items-center gap-5">
                <div className="w-[100px] h-[100px] rounded-full bg-Grey-05"></div>
                <div>{partnerAuth?.brandNameKo || ''}</div>
              </div>
            </div>
            <div
              className={`${isHidden ? 'opacity-0' : 'opacity-100'} border border-Grey-50`}
            >
              <div className="">
                <div
                  className={`${pathname.includes('dashboard') ? 'bg-blue-500' : ''} py-5 px-4`}
                  onClick={goDashboard}
                >
                  대시보드
                </div>
                <div
                  className={`${pathname.includes('product') ? 'bg-blue-500' : ''} py-5 px-4 flex justify-between `}
                  onClick={toggleProduct}
                >
                  <div>상품 관리</div>
                  <div>{isProductOpen ? '˄' : '˅'}</div>
                </div>
                {isProductOpen && (
                  <ul>
                    {/* <li className="py-2 px-4" onClick={goAddProduct}>
                      상품 등록
                    </li> */}
                    {상품관리카테고리.map((item) => (
                      <li
                        key={`sidebar-상품관리카테고리-${item.name}`}
                        className="py-2 px-4"
                        onClick={item.onClick}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {isHidden && (
            <div className="fixed top-[4] left-[4px]" onClick={showSidebar}>
              {'[>]'}
            </div>
          )}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
