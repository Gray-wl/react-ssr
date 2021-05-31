import React from 'react';
import withStyles from '../withStyle';
import styles from './About.css';

const About = () => {
  return (
    <div>
      <h1 className={styles.title}>关于页面</h1>
    </div>
  );
};

export default withStyles(About, styles);
