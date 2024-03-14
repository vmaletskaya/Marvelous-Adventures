import React, { useEffect, useState, useRef } from 'react';
import ComicsCard from 'elements/ComicsCard/ComicsCard';
import fetchComics from '../../helpers/api';
import BtnIcon1 from '../../images/arrow-left.svg';
import BtnIcon2 from '../../images/arrow-right.svg';

import css from './LastComics.module.css';

const LastComics = ({ onItemClick }) => {
  const [items, setItems] = useState([]);
  const [showPrevButton, setShowPrevButton] = useState(true);
  const [showNextButton, setShowNextButton] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const comicsListRef = useRef(null);

  useEffect(() => {
    fetchComics()
      .then(data => {
        const validComics = data.results.filter(comic => 
          comic.thumbnail && 
          comic.thumbnail.path && 
          comic.thumbnail.extension && 
          comic.title && 
          comic.creators &&
          comic.creators.items && 
          comic.creators.items.length > 1 
        );

        const uniqueComics = validComics.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setItems(uniqueComics);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (comicsListRef.current) {
      const listWidth = comicsListRef.current.offsetWidth;
      const cardWidth = comicsListRef.current.querySelector('.card')?.offsetWidth || 0;
      setVisibleCards(Math.floor(listWidth / cardWidth)); 
    }
  }, [items]); 

  const handleScroll = () => {
    if (comicsListRef.current) {
      const scrollLeft = comicsListRef.current.scrollLeft;
      setShowPrevButton(scrollLeft > 0);
      setShowNextButton(comicsListRef.current.scrollWidth - scrollLeft > comicsListRef.current.offsetWidth);
    }
  };

  const scroll = (direction) => {
    if (comicsListRef.current) {
      const scrollDistance = comicsListRef.current.offsetWidth / 2;
      comicsListRef.current.scrollBy({
        left: direction * scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={css.container}>
      <h2 className={css.titleBlock}>Last Comics</h2>
      <ul className={css.comicsList} onScroll={handleScroll} ref={comicsListRef}>
        {items.slice(0, visibleCards).map((item, index) => (
          <li key={item.id} className={css.cardContainer}>
            <ComicsCard
              image={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              title={item.title}
              authors={item.creators.items.map(creator => creator.name)}
              onClick={() => onItemClick(item)}
            />
          </li>
        ))}
      </ul>
      <div className={css.btnContainer}>
        {showPrevButton && (
          <div className={css.button} onClick={() => scroll(-1)}>
            <img src={BtnIcon1} alt="Icon" className={css.BtnIcon} />
          </div>
        )}
        {showNextButton && (
          <div className={css.button} onClick={() => scroll(1)}>
            <img src={BtnIcon2} alt="Icon" className={css.BtnIcon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LastComics;
