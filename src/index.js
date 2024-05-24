import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { HashRouter } from 'react-router-dom';
import ToastWrapper from './elements/ToastWrapper.jsx';

import 'react-toastify/dist/ReactToastify.css';

// import ModalProvider from 'components/Modal/ModalContext/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
      {/* <ModalProvider> */}
      <App />
         <ToastWrapper />
        {/* </ModalProvider> */}
 
      </HashRouter>
   
  
  </React.StrictMode>
);
