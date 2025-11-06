import { Outlet } from 'react-router-dom';

const PartersLayout = () => {
  return (
    <div className="min-w-[1040px]">
      <Outlet />
    </div>
    // <div className="max-w-[1280px] mx-auto flex flex-col">
    //   <main className="relative min-h-[calc(100vh-80px)]">
    //   </main>
    // </div>
  );
};

export default PartersLayout;
