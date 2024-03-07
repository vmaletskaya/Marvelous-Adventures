
import React, { useEffect, useState } from 'react';
import ComicsCard from 'elements/ComicsCard/ComicsCard';
import fetchComics from '../../helpers/api'; 

import css from './LastComics.module.css';

const LastComics = ({ onItemClick }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchComics()
      .then(data => setItems(data.results)) 
      .catch(error => console.error(error));
  }, []);

  return (
    <div className={css.container}>
       <h2 className={css.titleBlock}>Last Comics</h2>
      <ul className={css.comicsList}>
      {items.map(item => (
        <ComicsCard
          key={item.id}
          image={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
          title={item.title}
          authors={item.creators.items.map(creator => creator.name)}
          onClick={() => onItemClick(item)}
        />
      ))}
    </ul>
    </div>
    
  );
};

export default LastComics;




