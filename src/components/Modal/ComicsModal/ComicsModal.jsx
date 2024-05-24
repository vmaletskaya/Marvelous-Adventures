import { useState, useEffect, useRef } from 'react';
import { getComicsById } from '../../../services/api';
import css from './ComicsModal.module.css';
import CloseBtn from '../../../elements/CloseBtn/CloseBtn';

import { Characters, Creators, Details, About, Gallery } from '../ModalBlocks';

import useWindowResize from '../../../hooks/useWindowResize';

const ComicsModal = ({ comicsCode, closeModal }) => {
  const [comicsData, setComicsData] = useState(null);
  const [creators, setCreators] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [stories, setStories] = useState(null);
  const [height, setHeight] = useState(null);
  const [seriesDescription, setSeriesDescription] = useState(null);
  const { width } = useWindowResize();
  const [status, setStatus] = useState('init');
  const descriptionBlock = useRef(null);

  useEffect(() => {
    (async () => {
      setStatus('pending');
      try {
        const { result, creators, characters, stories, description } =
          await getComicsById(comicsCode);
        console.log('Fetched Data:', {
          result,
          creators,
          characters,
          stories,
          description,
        });
        setComicsData(result);
        setCreators(creators);
        setCharacters(characters);
        setStories(stories);
        setSeriesDescription(description);
        setStatus('fulfilled');
      } catch (error) {
        console.error('Error fetching comics data:', error);
        setStatus('error');
      }
    })();
  }, [comicsCode]);

  function getHeight(galleryHeight) {
    const descriptionBlockHeight = descriptionBlock.current?.clientHeight;
    if (galleryHeight > descriptionBlockHeight) {
      setHeight(`${galleryHeight}px`);
    }
  }

  if (status === 'pending') {
    return <div className={css.notification}>Loading...</div>;
  }

  if (status === 'error') {
    return <div className={css.notification}>Error loading data</div>;
  }

  if (!comicsData || !stories) {
    return <div className={css.notification}>Data not available</div>;
  }

  return (
    <article className={css.modalCard}>
      <CloseBtn onClick={closeModal} />
      <Gallery
        stories={stories}
        comicsData={comicsData}
        setHeight={getHeight}
      />
      <div
        className={css.descriptionBlock}
        style={{ height: width >= 1440 ? height : '' }}
        ref={descriptionBlock}
      >
        <About
          comic={comicsData}
          creators={creators}
          seriesAbout={seriesDescription}
          characters={characters}
        />
        <Details comic={comicsData} />
        <Creators creators={creators} />
        <Characters characters={characters} />
      </div>
    </article>
  );
};

export default ComicsModal;
