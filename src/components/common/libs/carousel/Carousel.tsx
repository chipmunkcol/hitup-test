import { useCallback, useEffect, useState } from 'react';
import './carousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import { TYPOGRAPHY } from '@/styles/typography';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images?.map((image, index) => (
            <div className="embla__slide w-full h-full" key={index}>
              <img className="w-full h-full" src={image} alt="slider-image" />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
    </section>
  );
}

const useSelectedSnapDisplay = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length);
    setSelectedSnap(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    updateScrollSnapState(emblaApi);
    emblaApi.on('select', updateScrollSnapState);
    emblaApi.on('reInit', updateScrollSnapState);
  }, [emblaApi, updateScrollSnapState]);

  return {
    selectedSnap,
    snapCount,
  };
};

type SelectedSnapDisplayProps = {
  selectedSnap: number;
  snapCount: number;
};
export const SelectedSnapDisplay = (props: SelectedSnapDisplayProps) => {
  const { selectedSnap, snapCount } = props;

  return (
    <div
      className={`embla__selected-snap-display ${TYPOGRAPHY.Subheading16Bold}`}
    >
      <div className="text-white">{selectedSnap + 1}</div>
      <div className="text-Grey-20">/</div>
      <div className="text-Grey-20">{snapCount}</div>
    </div>
  );
};
