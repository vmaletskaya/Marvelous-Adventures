import css from '../ComicsModal/ComicsModal.module.css';
import { useEffect, useRef, useState } from 'react';
import { getCaracter } from '../../../services/api';
import ModalComicCard from '../../../elements/ModalComicCard/ModalComicCard';
import CloseBtn from '../../../elements/CloseBtn/CloseBtn';
import { dateFormater, blockSplitter, lorem } from '../../../helpers';

import { Gallery } from '../ModalBlocks';
import useWindowResize from '../../../hooks/useWindowResize';

const CharacterModal = ({ id, closeModal }) => {
  const [character, setCharacter] = useState(null);
  const [comicsList, setComicsList] = useState(null);
  const [stories, setStories] = useState(null);
  const [height, setHeight] = useState(null);
  const { width } = useWindowResize();
  const descriptionBlock = useRef(null);

  function getHeight(galleryHeight) {
    const descriptionBlockheight = descriptionBlock.current.clientHeight;
    if (galleryHeight > descriptionBlockheight) {
      setHeight(`${galleryHeight}px`);
    }
  }

  useEffect(() => {
    (async () => {
    
      const { character, comicsList, stories } = await getCaracter(id);
      setCharacter(character);
      setComicsList(comicsList);
      setStories(stories);
     
    })();
  }, [id]);

  if (!character) {
    return <div className={css.notification}>Loading...</div>;
  }

  return (
    <article className={`${css.modalCard} ${css.characterCard}`}>
      <CloseBtn onClick={closeModal} />
      <Gallery stories={stories} comicsData={character} setHeight={getHeight} />
      <div
        className={css.descriptionBlock}
        style={{ height: width >= 1440 ? height : '100%' }}
        ref={descriptionBlock}
      >
        <div className={css.aboutHeader}>
          <h3 className={css.modalTitle}>{character.name}</h3>
          <ul className={css.authorDetailTitle}>
            <li>{dateFormater(character.modified)}</li>
          </ul>
        </div>
        <ul className={css.modalText}>
          {character.description === '' || null
            ? blockSplitter(lorem)
            : blockSplitter(character.description)}
        </ul>
        <p className={css.modalTitle}>List of comics</p>
        <ul className={`${css.charactersListItem} ${css.charItems}`}>
          {comicsList?.map((comic, i) => (
            <ModalComicCard key={comic.id} card={comic} i={i} />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default CharacterModal;
