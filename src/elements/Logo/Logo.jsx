import logo from '../../images/logo.svg'
import css from './Logo.module.css'
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'}>
             <img src={logo} alt='logo' className={css.logo} />
        </Link>
       
    )
}


export default Logo;