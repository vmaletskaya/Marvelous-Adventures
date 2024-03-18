import inst from '../../images/inst.svg'
import fb from '../../images/fb.svg'
import tw from '../../images/tw.svg'

import css from './Socials.module.css'

const Socials = () => {
    return (
        <ul className={css.socials}>
            <li>
                <a className={css.elements} href="https://www.facebook.com" target="blank" title="Move to Facebook">
                    <img className={css.icons} src={fb} alt="facebook" width="40"/>
                </a>
        
            </li>
            <li>
                <a className={css.elements} href="https://www.instagram.com/" target="blank" title="Move to Instagram">
                      <img className={css.icons} src= {inst} alt="instagram"  width="40" />
                 </a>
              
            </li>
            <li>
                <a  className={css.elements} href="https://twitter.com/" target="blank" title="Move to Twitter">
                     <img className={css.icons} src={tw} alt="twitter"  width="40"/>
                 </a>
               
            </li>
 </ul>
    )
}

export default Socials;