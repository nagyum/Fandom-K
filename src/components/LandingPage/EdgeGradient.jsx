import React from "react";
import styles from "./EdgeGradient.module.scss";
import images from "./LandingPageImages.jsx";


const EdgeGradient = ({ children }) => {
  return (
    <div className={styles.wrapper}>
        <img className={styles.edgegradient} src={images.edgevector} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default EdgeGradient;