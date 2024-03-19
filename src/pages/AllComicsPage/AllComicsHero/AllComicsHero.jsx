import css from './AllComicsHero.module.css'
import GoBackBtn from 'elements/GoBackBtn/GoBackBtn';

const ComicsHero = () => {
    return (
        <div className={css.hero}>
            <article className={css.info}>
                <p className={css.about}>Web-based platform</p>
                <h1 className={css.title}>Comics</h1>
                <p className={css.description}>Comics is a medium used to express ideas with images, often combined with text or other visual information. </p>
            </article>
            <GoBackBtn/>
  </div>
    )
}





export default ComicsHero;