import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '../../../styles/typography';

const Tab = () => {
  const pathname = window.location.pathname;
  console.log('currentPath: ', pathname);
  const currentPath = pathname.split('/')[1];

  return (
    <div className="px-[20px] h-[40px]  flex items-center justify-start gap-[20px]">
      <div className=" flex flex-col  gap-[8px]">
        <Link to={'/'}>
          <div
            className={`w-[20px] flex justify-center ${currentPath === '' ? 'text-black' : 'text-Grey-60'} ${TYPOGRAPHY.Subheading16Medium} cursor-pointer`}
          >
            홈
          </div>
          <div
            className={`border-b-2 border-black ${currentPath === '' ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        </Link>
      </div>
      <div className=" flex flex-col  gap-[8px]">
        <Link to={'/new'}>
          <div
            className={`w-[48px] flex justify-center ${currentPath === 'new' ? 'text-black' : 'text-Grey-60'} ${TYPOGRAPHY.Subheading16Medium} cursor-pointer`}
          >
            신상품
          </div>
          <div
            className={`border-b-2 border-black ${currentPath === 'new' ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        </Link>
      </div>
      <div className=" flex flex-col  gap-[8px]">
        <Link to={'/best'}>
          <div
            className={`w-[48px] flex justify-center ${currentPath === 'best' ? 'text-black' : 'text-Grey-60'} ${TYPOGRAPHY.Subheading16Medium} cursor-pointer`}
          >
            베스트
          </div>
          <div
            className={`border-b-2 border-black ${currentPath === 'best' ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        </Link>
      </div>
    </div>
  );
};

export default Tab;
