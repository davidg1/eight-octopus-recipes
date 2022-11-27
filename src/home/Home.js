import React from 'react';
import styles from './Home.module.css';

import videoBackgroundPoster from '../assets/images/video-background-poster.jpg';
import octopusCookingBackground from '../assets/videos/octopus-cooking-background-3000cbr.mp4';

import cookingPotLogoForeground from '../assets/images/cooking-pot-logo-foreground.png';

const Home = props => (
  <div className={styles.homeWrapper}>
    <div className={styles.homeVideoWrapper}>
      <video
        src={octopusCookingBackground}
        poster={videoBackgroundPoster}
        autoPlay
        loop
        muted
      />
    </div>

    <div className={styles.homeImageWrapper}>
      <img src={cookingPotLogoForeground} alt="logo" />
    </div>
  </div>
);

export default Home;
