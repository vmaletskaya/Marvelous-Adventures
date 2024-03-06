import React from 'react';
import ComicsCard from 'elements/ComicsCard/ComicsCard';

import css from './LastComics.module.css';

const LastComics = ({ comics, onItemClick }) => {
  if (!comics || !Array.isArray(comics)) {
    return null; 
  }
  return (
    <div>
        <h2 className={css.titleBlock}>Last Comics</h2>
       <ul className={css.comicsList}>
      {comics.map(comic => (
        <ComicsCard
          key={comic.id} 
          image={comic.thumbnail} 
          title={comic.title} 
          authors={comic.authors}
          onClick={() => onItemClick(comic)} 
        />
      ))}
    </ul>
    </div>
   
  );
};

export default LastComics;