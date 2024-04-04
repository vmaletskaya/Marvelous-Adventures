import { Routes, Route } from "react-router-dom";
import React from 'react';
import SharedLayout from "pages/SharedLayout/SharedLayout";
import HomePage from "pages/HomePage/HomePage";
import AllComicsPage from '../pages/AllComicsPage/AllComicsPage'
import useWindowDimensions from '../hooks/useWindowResize';

export const App = () => {
  const { width } = useWindowDimensions();
  
    let limit = width >= 1100 ? 16 : width < 500 ? 5 : 8;
  return (
    <div>
       <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
         <Route path="/all-comics" element={<AllComicsPage limit={limit > 0 && limit} />} />
          </Route>
        </Routes>
    </div>
  );
};

