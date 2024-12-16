import React from 'react';
import styles from './SectionsStyles.module.css';
import '../../styles/color.scss';
import '../../styles/font.scss';

function Section({donate, title, bgimg, screenimg}){
    return (
        <div className={styles.section}>
            <div className={styles["section-header"]}>
                <p>{donate}</p>
                <h1>{title}</h1>
            </div>
         <div className={styles["image-container1"]}>
            <div className={styles["background-image"]}>
                <img src={bgimg} alt={title} />
            </div> 
            <div className={styles["foreground-image"]}>
                <img src={screenimg} alt={title} />
            </div>
         </div> 
        </div>



    )

}

export default Section;