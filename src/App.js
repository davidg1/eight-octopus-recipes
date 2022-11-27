import React, { useState } from 'react';

import Header from './Header';
import Main from './Main';

import styles from './App.module.css';

const App = props => {
  const [inspirationModalShown, setInspirationModalShown ] = useState(false);   //only want to show inspiration modal one time
  const [recipeImagesLoaded, setRecipeImagesLoaded ] = useState(false);
  const [nutritionImagesLoaded, setNutritionImagesLoaded ] = useState(false);

  let recipeImageLoadCounter = 0;
  let nutritionImageLoadCounter = 0;


  const handleButtonClick = event => {
    if (event.target.id === 'inspiration-modal-button') {
      setInspirationModalShown(true);
    }
  }


  const handleImageLoad = event => {
    if (event.target.id.startsWith('recipe')) {
      recipeImageLoadCounter++;
      console.log(recipeImageLoadCounter)
      if (recipeImageLoadCounter === 8) {
        setRecipeImagesLoaded(true);
      }
    }

    if (event.target.id.startsWith('nutrition')) {
      nutritionImageLoadCounter++;
      console.log(nutritionImageLoadCounter)
      if (nutritionImageLoadCounter === 3) {
        setNutritionImagesLoaded(true);
      }
    }
  }


  return (
    <div className={styles.App}>
      <Header />
      <Main
        buttonClickHandler={handleButtonClick}
        imageLoadHandler={handleImageLoad}
        inspirationModalShown={inspirationModalShown}
        recipeImagesLoaded={recipeImagesLoaded}
        nutritionImagesLoaded={nutritionImagesLoaded}
      />
    </div>
  );
}

export default App;
