import { urlNormalizer, getImage } from '../../../helpers';
import { useState, useEffect, useRef } from 'react';
import useOnLoadImages from '../../../hooks/useOnLoadImages';

import css from '../ComicsModal/ComicsModal.module.css';

const Gallery = ({ comicsData, stories, setHeight }) => {
  const { thumbnail } = comicsData;

  const [mainPhoto, setMainPhoto] = useState(thumbnail);

  const ref = useRef(null);
  const imageContainer = useRef(null);
  const imagesAreLoaded = useOnLoadImages(imageContainer);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  }, [imagesAreLoaded, setHeight]);

  return (
    <div className={css.photoBlock} ref={ref}>
      <span className={css.imgBG}>
        <img
          className={`${css.img}`}
          src={urlNormalizer(getImage(mainPhoto))}
          alt="cover"
        />
      </span>
      <ul className={css.imageGallery} ref={imageContainer}>
        {stories &&
          stories.slice(0, 8).map(({ id, thumbnail, title }) => {
            if (!thumbnail.path.includes('image_not_available')) {
              return (
                <li key={id}>
                  <img
                    className={`${css.galleryImage}`}
                    src={urlNormalizer(getImage(thumbnail))}
                    alt="gallery"
                    onClick={() => {
                      setMainPhoto(thumbnail);
                    }}
                    title={title}
                  />
                </li>
              );
            } else {
              return null;
            }
          })}
      </ul>
    </div>
  );
};

export default Gallery;
