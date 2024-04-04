// import React from 'react';

// import css from './ComicsCard.module.css';

// const ComicsCard = ({ image, title, authors, onClick }) => {
//   const MAX_AUTHORS = 3;
//   const displayedAuthors = authors.slice(0, MAX_AUTHORS);
//   const otherAuthorsCount = authors.length - MAX_AUTHORS;

//   return (
//     <>
//       <div className={css.item} onClick={onClick}>
//         <img src={image} alt={title} className={css.image} />
//         <div className={css.details}>
//           <h3 className={css.title}>{title}</h3>
//           <p className={css.authors}>
//             {displayedAuthors.join(', ')}
//             {otherAuthorsCount > 0 && `... and ${otherAuthorsCount}`}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ComicsCard;

// import React from 'react';
// import css from './ComicsCard.module.css';

// const ComicsCard = ({ image, title, authors, onClick }) => {
//   const MAX_AUTHORS = 3;

  
//   const displayedAuthors = Array.isArray(authors) ? authors.slice(0, MAX_AUTHORS) : [];
//   const otherAuthorsCount = Array.isArray(authors) ? authors.length - MAX_AUTHORS : 0;

//   return (
//     <div className={css.item} onClick={onClick}>
//       <img src={image} alt={title} className={css.image} />
//       <div className={css.details}>
//         <h3 className={css.title}>{title}</h3>
//         <p className={css.authors}>
//           {displayedAuthors.join(', ')}
//           {otherAuthorsCount > 0 && `... and ${otherAuthorsCount}`}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ComicsCard;

import { getImage, urlNormalizer } from 'helpers';
import css from './ComicsCard.module.css';
import { motion } from 'framer-motion';
import { cardVariants } from '../../elements/Animations/animation-settings';
import useAnimation from 'hooks/useAnimation';
import { useRef } from 'react';

const ComicsCard = ({ card, openModal, size, i }) => {
  const { title, thumbnail, creators, id } = card;

  const ref = useRef(null);

  useAnimation(ref);

  const styles = {
    hero: css.hero,
    basic: css.basic,
  };

  const authors = creators.items.filter(author => author.role === 'writer');

  return (
    <motion.div
      variants={cardVariants}
      animate="visible"
      initial="hidden"
      custom={i}
      className={`${css.card} ${styles[size]}`}
      onClick={() => openModal(id)}
      title={`${title} \nby: ${authors.map(author => author.name).join(' and ')}`}
    >
      <img
        className={`${css.cardImage}`}
        src={urlNormalizer(getImage(thumbnail))}
        alt="character"
        ref={ref}
        data-item
      />
      <ul className={css.cardBottomTab}>
        <li className={css.cardTitle}>{title}</li>
        <li className={css.cardAuthor}>{authors.map(author => author.name).join(', ')}</li>
      </ul>
    </motion.div>
  );
};

export default ComicsCard;

