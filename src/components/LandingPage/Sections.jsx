import React from "react";
import styles from "./SectionsStyles.module.scss";
import "../../styles/color.scss";
import "../../styles/font.scss";
import { motion } from "framer-motion";

function Section({ donate, title, bgimg, screenimg }) {
  return (
    <main>
      <div className={styles["background-image"]}>
        <img src={bgimg} alt={title} />
      </div>
      <div className={styles.section}>
        <motion.div
          className={styles.motiondiv}
          initial={{ opacity: 0.7, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
          //y: {duration: 0.5},
          }}
        >
          <div className={styles.headerdiv}>
            <div className={styles["section-header"]}>
              <p>{donate}</p>
              <h1>{title}</h1>
            </div>
          </div>
          <div className={styles["image-container1"]}>
            <div className={styles["foreground-image"]}>
              <img src={screenimg} alt={title} />
            </div>
          </div>
        </motion.div>


        <motion.div
          className={styles["gradient-bar"]}
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
          }}
        >
         
        </motion.div>
      </div>
    </main>
  );
}

export default Section;
