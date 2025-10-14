import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import './tumbCarousel.css';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';

interface TumbCarouselProps {
  images: string[];
}

export function TumbCarousel({ images }: TumbCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'y',
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaMainApi);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="tumb-carousel">
      <div className="tumb-carousel__viewport" ref={emblaMainRef}>
        <div className="tumb-carousel__container">
          {images.map((image, index) => (
            <div className="tumb-carousel__slide" key={index}>
              <img src={image} className="w-full h-full" />
            </div>
          ))}
        </div>

        <div className="tumb-carousel__controls">
          <div className="tumb-carousel__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>

      <div className="tumb-carousel-thumbs">
        <div className="tumb-carousel-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="tumb-carousel-thumbs__container">
            {images.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                value={image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Thumb = (props: {
  selected: boolean;
  value: string;
  onClick: () => void;
}) => {
  const { selected, value, onClick } = props;

  return (
    <div
      className={'tumb-carousel-thumbs__slide'.concat(
        selected ? ' tumb-carousel-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="tumb-carousel-thumbs__slide__number z-20"
      >
        <img src={value} />
      </button>
    </div>
  );
};
