import { useEffect, useRef, useState } from 'react';
import { TYPOGRAPHY } from '../../../styles/typography';
import CancelIcon from '../icon/CancelIcon';
import Searchbar from '../Searchbar';

const 인기검색어 = [
  '배스',
  '쭈꾸미',
  '무늬오징어',
  '갑오징어',
  '에기',
  '시마노',
  '쏘가리',
  '갈치',
  '감성돔',
  '릴',
];

const 최근검색어 = ['아부가르시아', '릴', '로드', '낚시대'];

// 여기서 최금 검색어, 인기 검색어 api 불러오든지 useQuery 캐싱이랑 꼬이게 되면
// 부모인 Header에서 호출하고 props로 내려받는걸로 변경 고려

const SearchField = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // 버튼이나 패널 안쪽 클릭은 무시
      if (
        inputRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      // 바깥 클릭 → 닫기
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Searchbar ref={inputRef} onClick={handleOpen} />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="w-[400px] bg-white z-10 absolute top-[57px] rounded-[16px] pb-[16px] px-[20px]"
        >
          <div className="flex justify-between py-[12px]">
            <div className={TYPOGRAPHY.Subheading16Bold}>최근 검색어</div>
            <div className={`text-Grey-60 ${TYPOGRAPHY.Body14Medium}`}>
              전체 삭제
            </div>
          </div>
          <div
            className={`text-Grey-80 ${TYPOGRAPHY.Label12Medium} flex gap-[12px] py-[12px]`}
          >
            {최근검색어.slice(0, 5).map((item) => (
              <div
                className={`px-[12px] py-[8px] bg-Grey-10 rounded-[16px] flex items-center gap-[4px]`}
              >
                <div>{item}</div>
                <CancelIcon />
              </div>
            ))}
          </div>
          <div className={`${TYPOGRAPHY.Subheading16Bold} py-[12px]`}>
            인기 검색어
          </div>
          <div className="grid grid-flow-col grid-rows-5 gap-x-[16px]">
            {인기검색어.map((item, index) => (
              <div className="border-b border-b-Grey-50 w-[172px] py-[8px] flex items-center justify-start gap-[12px] ">
                <div
                  className={`w-[16px] ${index < 3 ? 'text-HITUP_Blue' : ''} ${TYPOGRAPHY.Body14Semi}`}
                >
                  {index + 1}
                </div>
                <div className={TYPOGRAPHY.Body14Medium}> {item}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
