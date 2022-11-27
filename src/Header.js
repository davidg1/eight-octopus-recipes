
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css'

const Header = () => (
  <header className={styles.header}>
    <nav>
      <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>Home</NavLink></li>
        <li><NavLink to="/recipes" className={({ isActive }) => isActive ? styles.active : undefined}>Recipes</NavLink></li>
        <li><NavLink to="/nutrition" className={({ isActive }) => isActive ? styles.active : undefined}>Nutrition</NavLink></li>
        <li><NavLink to="/inspiration" className={({ isActive }) => isActive ? styles.active : undefined}>Inspiration</NavLink></li>
      </ul>
    </nav>
  </header>
);

export default Header;
