import css from './Hero.module.css';
import MarvelousHero from '../../images/pantera.svg';
import MarvelousHero1 from '../../images/pantera1.svg';

const Hero = () => {
  return (
    <div>
      <div className={css.container}>
        <p className={css.heroCaption}>Web-based platform</p>
        <h1 className={css.heroTitle}>Marvelous Adventures</h1>
        <p className={css.heroDesc}>
          is a web-based platform that provides an immersive experience for
          users to explore and discover a vast collection of Marvel characters
          and comics. Start exploring the Marvelous Adventures now by visiting
          our Characters and Comics sections and discover your new favorites
          today.
        </p>
        <button className= {css.heroBtn}>All comics</button>
      </div>
      <div className={css.pagination}>
        <div className={css.pageEl}></div>
        <div className={css.pageEl}></div>
        <div className={css.pageEl}></div>
      </div>
      <div>
              <img src={MarvelousHero} alt="Black Panther" className={css.heroImg} />
        <img src={MarvelousHero1} alt="Black Panther" className={css.heroImg} />
        <p>Characters</p>
        <p>
          T’Challa is the king of the secretive and highly advanced African
          nation of Wakanda - as well as the powerful warrior known as the Black
          Panther.
        </p>
      </div>
    </div>
  );
};

export default Hero;
