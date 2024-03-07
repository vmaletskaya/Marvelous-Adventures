// ComicsCard.js
import React from 'react';

import css from './ComicsCard.module.css';

const ComicsCard = ({ image, title, authors, onClick }) => {
  const MAX_AUTHORS = 3; // Максимальное количество авторов для отображения
  const displayedAuthors = authors.slice(0, MAX_AUTHORS);
  const otherAuthorsCount = authors.length - MAX_AUTHORS;

  return (
    <li className={css.item} onClick={onClick}>
      <img src={image} alt={title} className={css.image} />
      <div className={css.details}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.authors}>
          {displayedAuthors.join(', ')}
          {otherAuthorsCount > 0 && `... и еще ${otherAuthorsCount}`}
        </p>
      </div>
    </li>
  );
};

export default ComicsCard;
