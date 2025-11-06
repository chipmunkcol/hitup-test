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

  return (
    <div className="h-full w-full ">
      <div className="h-full flex">
        <div
          className={`relative transition-all duration-500 ${isHidden ? 'w-[30px]' : 'w-[330px]'} `}
        >
          <div
            className={`fixed transition-all duration-500 ${isHidden ? ' -left-[300px]' : 'left-0'} w-[330px] h-full bg-Grey-10`}
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
              className={`${isHidden ? 'opacity-0' : 'opacity-100'} border border-Grey-50 px-4`}
            >
              <div className="py-4">상품 관리</div>
              <ul>
                <li className="py-2">상품 등록</li>
              </ul>
            </div>
          </div>

          {isHidden && (
            <div
              className="absolute top-[40px] right-[6px]"
              onClick={showSidebar}
            >
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
