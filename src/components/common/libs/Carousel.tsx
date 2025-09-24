import { useCallback, useEffect, useState } from 'react';
import './carousel.css';
import useEmblaCarousel from 'embla-carousel-react';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { TYPOGRAPHY } from '../../../styles/typography';
import img1 from '../../../assets/images/Banner_carousel_desktop1.png';
import img2 from '../../../assets/images/Banner_carousel_desktop2.png';

const slides = [img1, img2];

export function Carousel() {
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
          {slides.map((image, index) => (
            <div className="embla__slide h-full" key={index}>
              <img className="h-full" src={image} alt="slider-image" />
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

const useSelectedSnapDisplay = (emblaApi) => {
  const [selectedSnap, setSelectedSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  const updateScrollSnapState = useCallback((emblaApi) => {
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

export const SelectedSnapDisplay = (props) => {
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
