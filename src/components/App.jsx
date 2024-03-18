
import React, { useState, useEffect } from 'react';
import fetchComics from '../helpers/api';
import Header from './Header/Header';
import Hero from '../pages/HomePage/Hero';
import LastComics from '../elements/LastComics/LastComics';
import ComicsCard from '../elements/ComicsCard/ComicsCard';
import Footer from './Footer/Footer';

export const App = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchComics();
      if (data) {
        setComics(data.results);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <LastComics>
        {comics.map(comic => (
          <ComicsCard
            key={comic.id}
            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            title={comic.title}
            authors={comic.creators.items.map(creator => creator.name)}
          />
        ))}
      </LastComics>
      <Footer />
    </div>
  );
};

