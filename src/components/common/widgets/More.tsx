import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from '../../../styles/typography';

interface MoreProps {
  path: string;
  title: string;
  description: string;
}

const More = ({ title, description, path }: MoreProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-[24px]">
      <div className="py-[12px] flex justify-between items-center">
        <div className={TYPOGRAPHY.Heading28Bold}>{title}</div>
        <div
          className="flex items-center gap-[16px] cursor-pointer"
          onClick={() => navigate(path)}
        >
          <div className={`text-Grey-70 ${TYPOGRAPHY.Heading222Medium}`}>
            더보기
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <g clip-path="url(#clip0_14564_289)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.707 11.7932C15.8944 11.9807 15.9998 12.235 15.9998 12.5002C15.9998 12.7653 15.8944 13.0197 15.707 13.2072L10.05 18.8642C9.95773 18.9597 9.84739 19.0359 9.72538 19.0883C9.60338 19.1407 9.47216 19.1683 9.33938 19.1694C9.2066 19.1706 9.07492 19.1453 8.95202 19.095C8.82913 19.0447 8.71747 18.9705 8.62358 18.8766C8.52969 18.7827 8.45544 18.671 8.40515 18.5481C8.35487 18.4252 8.32957 18.2936 8.33073 18.1608C8.33188 18.028 8.35947 17.8968 8.41188 17.7748C8.46428 17.6528 8.54047 17.5424 8.63598 17.4502L13.586 12.5002L8.63598 7.55018C8.45382 7.36158 8.35302 7.10898 8.3553 6.84678C8.35758 6.58458 8.46275 6.33377 8.64816 6.14836C8.83357 5.96295 9.08438 5.85778 9.34658 5.85551C9.60877 5.85323 9.86137 5.95402 10.05 6.13618L15.707 11.7932Z"
                fill="#606060"
              />
            </g>
            <defs>
              <clipPath id="clip0_14564_289">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className={`text-Grey-60 ${TYPOGRAPHY.Heading222Semi} py-[12px]`}>
        {description}
      </div>
    </div>
  );
};

export default More;
