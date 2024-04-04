import AllComicsHero from '../AllComicsPage/AllComicsHero/AllComicsHero'
import SearchForm from 'components/SearchForm/SearchForm';
import CardList from './CardList/CardList';
import React, { useState } from 'react';
import LoadAnimation from '../../elements/Animations/LoadAnimation'
 import { AnimatePresence } from 'framer-motion';

const AllComicsPage = props  => {
       const [isChanged, setIsChanged] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
    return (
        <LoadAnimation>
      <div data-scroll-section>
        <AllComicsHero />
        <SearchForm isSet={setIsChanged} disabled={isDisabled} />
        <AnimatePresence>
          <CardList cardLimit={props.limit} isFormSearch={isChanged} isFormDisabled={setIsDisabled} />
        </AnimatePresence>
      </div>
    </LoadAnimation>
        
    )
}




export default AllComicsPage;