import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './home/Home';
import Recipes from './recipes/Recipes';
import Nutrition from './nutrition/Nutrition';
import Inspiration from './inspiration/Inspiration';

import styles from './Main.module.css';

const Main = (props) => (
  <main className={styles.main}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route
        path="/recipes/*"
        element={<Recipes imageLoadHandler={props.imageLoadHandler} recipeImagesLoaded={props.recipeImagesLoaded} />}
      />
      <Route
        path="/nutrition"
        element={<Nutrition imageLoadHandler={props.imageLoadHandler} nutritionImagesLoaded={props.nutritionImagesLoaded} />}
      />
      <Route
        path="/inspiration"
        element={<Inspiration buttonClickHandler={props.buttonClickHandler} modalShown={props.inspirationModalShown} />}
      />
    </Routes>
  </main>
);

export default Main;
