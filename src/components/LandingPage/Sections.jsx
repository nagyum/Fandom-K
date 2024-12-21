import React from "react";
import styles from "./SectionsStyles.module.scss";
import "../../styles/color.scss";
import "../../styles/font.scss";
import { motion } from "framer-motion";

function Section({ donate, title, bgimg, screenimg }) {
  return (
    <main>
      
      <motion.div
          className={styles.motiondiv}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
            x: { duration: 1 },
          }}
            style={{
              zIndex: 2,
            }}
          
        > 
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
      </motion.div>
    </main>
  );
}

export default Section;
