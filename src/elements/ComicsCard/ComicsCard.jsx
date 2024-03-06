import React from 'react';

import css from './ComicsCard.module.css';

const ComicsCard = ({ image, title, authors, onClick }) => {
  return (
    <li className={css.item} onClick={onClick}>
      <img src={image} alt={title} className={css.image} /> 
      <div className={css.details}> 
        <h3 className={css.title}>{title}</h3> 
        <p className={css.authors}>{authors.join(', ')}</p> 
      </div>
    </li>
  );
};

export default ComicsCard;