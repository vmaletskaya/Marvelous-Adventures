import LoadAnimation from '../../elements/Animations/LoadAnimation';
import Hero from '../HomePage/Hero/Hero';
import LastComicsSlider from './LastComics/LastComicsSlider';


const HomePage = () => {
  return (
    <LoadAnimation>
      <Hero />
      <LastComicsSlider />
      </LoadAnimation>
    
  
  );
};

export default HomePage;
