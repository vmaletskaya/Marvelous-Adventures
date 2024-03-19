import { Routes, Route } from "react-router-dom";
import React from 'react';
import SharedLayout from "pages/SharedLayout/SharedLayout";
import HomePage from "pages/HomePage/HomePage";

export const App = () => {
  return (
    <div>
       <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          </Route>
        </Routes>
    </div>
  );
};

