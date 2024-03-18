import React from 'react';

import css from '../Footer/Footer.module.css';
import Logo from 'elements/Logo/Logo';
import Socials from '../../elements/Socials/Socials';
import License from './License/License';

const Footer = () => {
  return (
    <>
      <div className={css.footer}>
        <Logo />
        <p className={css.text}>Comics</p>
        <Socials />
      </div>
      <div>
        <License />
      </div>
    </>
  );
};

export default Footer;
