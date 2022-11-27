import React from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import recipesCollection from './recipes-collection';
import Recipe from './Recipe';
import ImagesLoader from '../common/ImagesLoader';

import spinnerOctopus from '../assets/images/spinner-octopus.png';

import styles from './Recipes.module.css'

const Recipes = props => {
  
  const recipeImageSources = recipesCollection.map(recipe => recipe.image);

  const location = useLocation();
  
  if (!props.recipeImagesLoaded) {
    return (
      <ImagesLoader
        imageSources={recipeImageSources}
        spinnerImageSource={spinnerOctopus}
        imageLoadHandler={props.imageLoadHandler}
        imagesName="recipe"
      />
    )
  }

  return (
        <div className={styles.recipesWrapper}>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes/1"/>} />
          </Routes>
          <div className={styles.recipesSidebar}>
            <h1>Recipes</h1>
            <nav>
              <ul>
                {recipesCollection.map(({id, shortName}) => (
                  <li key={id}>
                    <NavLink
                      to={`/recipes/${id}`}
                      className={({ isActive }) => isActive ? styles.active : undefined}
                    >
                      {shortName}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <section className={styles.recipeSection}>
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames={{
                  enter: styles.fadeEnter,
                  enterActive: styles.fadeEnterActive,
                  exit: styles.fadeExit,
                  exitActive: styles.fadeExitActive,
                }}
                timeout={1000}
              >  
                <Routes location={location}>
                  <Route path=":id" element={<Recipe />}/>
                </Routes>
              </CSSTransition>
            </TransitionGroup>
          </section>
        </div>
  );
}

export default Recipes;
