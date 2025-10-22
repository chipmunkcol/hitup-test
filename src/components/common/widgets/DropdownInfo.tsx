import { TYPOGRAPHY } from '@/styles/typography';
import { useState } from 'react';

interface DropdownInfoProps {
  title: string;
  // data: string;
  children: React.ReactNode;
}

const DropdownInfo = ({ title, children }: DropdownInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* header */}
      <div className="px-6 py-4 bg-Blue-05 flex justify-between items-center">
        <div className={TYPOGRAPHY.Heading124Bold}>{title}</div>
        <div onClick={toggleDropdown}>
          {isOpen ? (
            <div className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.93771 0.292658C6.12524 0.105187 6.37955 -0.000128746 6.64471 -0.000128746C6.90988 -0.000128746 7.16418 0.105187 7.35171 0.292658L13.0087 5.94966C13.1042 6.0419 13.1804 6.15225 13.2328 6.27425C13.2852 6.39626 13.3128 6.52748 13.314 6.66026C13.3151 6.79304 13.2898 6.92471 13.2395 7.04761C13.1893 7.17051 13.115 7.28216 13.0211 7.37605C12.9272 7.46994 12.8156 7.5442 12.6927 7.59448C12.5698 7.64476 12.4381 7.67006 12.3053 7.66891C12.1725 7.66775 12.0413 7.64017 11.9193 7.58776C11.7973 7.53535 11.687 7.45917 11.5947 7.36366L6.64471 2.41366L1.69471 7.36366C1.50611 7.54582 1.25351 7.64661 0.99131 7.64433C0.729114 7.64205 0.478301 7.53688 0.292893 7.35148C0.107485 7.16607 0.00231622 6.91526 3.78026e-05 6.65306C-0.00224062 6.39086 0.0985537 6.13826 0.280712 5.94966L5.93771 0.292658Z"
                  fill="black"
                />
              </svg>
            </div>
          ) : (
            <div className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.37625 7.37629C7.18872 7.56376 6.93442 7.66907 6.66925 7.66907C6.40409 7.66907 6.14978 7.56376 5.96225 7.37629L0.305251 1.71929C0.209742 1.62704 0.133558 1.5167 0.0811491 1.39469C0.0287409 1.27269 0.0011549 1.14147 9.53674e-07 1.00869C-0.00115299 0.87591 0.0241489 0.744231 0.0744295 0.621335C0.124711 0.498438 0.198965 0.386786 0.292857 0.292893C0.38675 0.199 0.498401 0.124747 0.621297 0.0744663C0.744194 0.0241854 0.875874 -0.00111606 1.00865 3.7757e-05C1.14143 0.00119157 1.27265 0.0287779 1.39466 0.0811869C1.51666 0.133596 1.627 0.209778 1.71925 0.305288L6.66925 5.25529L11.6193 0.305288C11.8079 0.12313 12.0605 0.0223355 12.3227 0.0246139C12.5849 0.0268924 12.8357 0.132061 13.0211 0.317469C13.2065 0.502877 13.3116 0.75369 13.3139 1.01589C13.3162 1.27808 13.2154 1.53069 13.0333 1.71929L7.37625 7.37629Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* content */}
      {isOpen && children}
    </div>
  );
};

export default DropdownInfo;
