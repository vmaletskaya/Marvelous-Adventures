import { fetchLastComics } from '../../../services/api';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../../../components/Modal/ModalContext/ModalContext';
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from '../../../helpers/LocalStotageApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { ReactComponent as ArrowL } from '../../../images/arrow-left.svg';
import { ReactComponent as ArrowR } from '../../../images/arrow-right.svg';
import { Mousewheel, Autoplay, FreeMode } from 'swiper/modules';

import ComicsCard from '../../../elements/ComicsCard/ComicsCard';
import css from '../LastComics/LastComics.module.css';
import './LastComicsSlider.css';
import { AnimationContext } from '../../../elements/Animations/AnimationContext';

const LastComicsSlider = () => {
  const [data, setData] = useState('');
  const [isStartBtnActive, setStartBtnActive] = useState(true);
  const [isEndBtnActive, setIsEndBtnActive] = useState(false);

  const LastComicsSlider = useRef();
const { openModal} = useContext(ModalContext);
  const animationState = useContext(AnimationContext);

  useEffect(() => {
    if (!readFromLocalStorage('TopComics')) {
      (async () => {
        const data = await fetchLastComics();
        setData(data.results);
        writeToLocalStorage('TopComics', data);
      })();
    } else {
      const data = readFromLocalStorage('TopComics');
      setData(data.results);
    }
  }, []);


  const handleClick = direction => {
    switch (direction) {
      case 'prev':
        LastComicsSlider.current.swiper.slidePrev();
        break;
      case 'next':
        LastComicsSlider.current.swiper.slideNext();
        break;
      default:
        break;
    }
  };

  function isButtonActive(e) {
    e.isBeginning ? setStartBtnActive(true) : setStartBtnActive(false);
    e.isEnd ? setIsEndBtnActive(true) : setIsEndBtnActive(false);
  }

  if (LastComicsSlider.current) {
    animationState
      ? LastComicsSlider.current.swiper.autoplay.start()
      : LastComicsSlider.current.swiper.autoplay.stop();
  }

  return (
    <div className="lastComics">
      <h2 className={css.title}>Last Comics</h2>
      <Swiper
        containerModifierClass={'swiper-lastComics'}
        slidesPerView={1.5}
        spaceBetween={16}
        speed={800}
        ref={LastComicsSlider}
        modules={[Autoplay, Mousewheel, FreeMode]}
        effect={'slide'}
        mousewheel={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1440: {
            cssWidthAndHeight: false,
            freeMode: false,
            sticky: true,
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
        onSlideChange={isButtonActive}
      >
        {data &&
          data.map((card, i) => (
            <SwiperSlide key={card.id}>
              <ComicsCard card={card} openModal={() => openModal(card.id)}  size={'hero'}  i={i} />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className={css.LastComicsPaginations}>
        <ArrowL
          className={`${css.arrowL} ${isStartBtnActive && css.inactive}`}
          onClick={() => handleClick('prev')}
        />
        <ArrowR
          className={`${css.arrowR} ${isEndBtnActive && css.inactive}`}
          onClick={() => handleClick('next')}
        />
      </div>
    </div>
  );
};

export default LastComicsSlider;
