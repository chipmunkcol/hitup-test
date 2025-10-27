import CancelIcon from '@/assets/images/icon/CancelIcon';
import { TYPOGRAPHY } from '@/styles/typography';
import { createPortal } from 'react-dom';

interface PortalLayoutProps {
  title: string;
  closePortal: () => void;
  children: React.ReactNode;
}

const PortalLayout = ({ title, children, closePortal }: PortalLayoutProps) => {
  return createPortal(
    <div
      className="z-[1000] w-full h-full fixed inset-0 flex justify-center items-start"
      style={{ background: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div className="w-[90%] md:w-[720px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  max-w-[720px] mx-auto">
        <div className="  bg-Grey-05 rounded-2xl flex flex-col justify-center">
          <div className="w-full py-4 px-5 bg-Blue-05 rounded-t-2xl flex justify-between items-center">
            <h1 className={`${TYPOGRAPHY.Heading124Bold}`}>{title}</h1>
            <div className="cursor-pointer" onClick={closePortal}>
              <CancelIcon />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PortalLayout;
