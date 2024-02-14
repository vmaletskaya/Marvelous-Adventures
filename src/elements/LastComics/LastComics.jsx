import React from 'react';

import css from './LastComics.module.css';

const LastComics = ({ image, title, author }) => {
  return (
    <div className={css.container}>
      <h2 className={css.titleBlock}>Last Comics</h2>
      <div>
        <img src="" alt="" />
        <div>
          {/* <h3></h3> */}
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default LastComics;
