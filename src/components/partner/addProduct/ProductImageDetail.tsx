import { swalAlert } from '@/components/common/libs/sweetalert/sweetalert';
import { useRef, useState } from 'react';

const DetailPageImageComponent = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const onClickFileRef = () => {
    fileRef.current?.click();
    console.log('fileRef: ', fileRef.current?.files);
  };
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (images.length > 10) {
      swalAlert('추가 이미지는 10개까지 등록 가능합니다.');
      return;
    }
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  return (
    <div className="flex gap-8">
      <div>
        추가 이미지* <br />
        (0/10)
      </div>
      <div className="py-6 flex flex-col gap-3 self-start">
        {/* 썸네일 이미지 업로드 */}
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={handleFileChange}
          name="이미지"
        />
        <div className=" flex gap-4">
          <div
            onClick={onClickFileRef}
            className="w-[100px] h-[100px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer text-gray-400"
          >
            +
          </div>

          <ul className="flex gap-4 w-[400px]  overflow-x-auto">
            {images.length > 0 &&
              images.map((image, index) => (
                <li
                  key={`add-review-image-${index}`}
                  className=" flex-shrink-0 relative flex gap-4 w-[100px]  border border-Grey-20 rounded-xl"
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div
                    onClick={() => {
                      setImages((prevImages) =>
                        prevImages.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-0 right-0 p-1 cursor-pointer"
                  >
                    <div className="leading-none w-[20px] h-[20px] bg-Grey-50 rounded-full flex items-center justify-center text-Grey-05">
                      x
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPageImageComponent;
