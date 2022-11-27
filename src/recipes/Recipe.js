import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Recipe.module.css';

import recipesCollection from './recipes-collection';

import threeUtensils from '../assets/images/three-utensils.png';

const Recipe = props => {
  const params = useParams();

  const idToMatch = params.id || '1';

  const recipe = recipesCollection.find(({ id }) => id === idToMatch);

  return (
    <div className={styles.recipeWrapper} ref={props.nodeRef}>
        <img src={recipe.image} alt="recipe" />
        <section className={styles.recipeInfoWrapper}>
          <h1>{recipe.fullName}</h1>
          <img src={threeUtensils} alt="three utensils"/>
          <p>{recipe.description}</p>
        </section>
    </div>
  );
}

export default Recipe;
