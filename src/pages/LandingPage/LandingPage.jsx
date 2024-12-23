import React from "react";
import "../../styles/color.scss";
import "../../styles/font.scss";
import logonobackground from "../../assets/images/logonobackground.svg";
import styles from "./LandingPageStyles.module.scss";
import Section from "../../components/LandingPage/Sections.jsx";
import images from "../../components/LandingPage/LandingPageImages.jsx";
import CustomButton from "../../components/CustomButtom/CustomButton.jsx";
import { useNavigate } from "react-router-dom";
import EdgeGradient from "../../components/LandingPage/EdgeGradient.jsx";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    localStorage.clear(); // localStorage 초기화
    navigate("/list"); // 원하는 페이지로 이동
  };

  return (
    <EdgeGradient>
      <div>
      
        <div className={styles["gradient-bar"]}></div>
   
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
          }}
        >

          <div className={styles.page1}>
            <div className={styles.background}>
              <div className={styles.page1}>
                <div className={styles.title}>
                  <h1>
                    내가 좋아하는 아이돌을 <br />
                    가장
                    <span className={styles["brand-orange"]}>
                      {" "}
                      쉽게 덕질
                    </span>{" "}
                    하는 방법
                  </h1>
                </div>
                <div className={styles["image-container"]}>
                  <img
                    onClick={() => {
                      navigate("/list");
                    }}
                    className={styles.logo}
                    src={logonobackground}
                    alt="logo"
                  />
                  <img
                    className={styles.backgroundimg}
                    src={images.bgimg1}
                    alt="bgimg1"
                  ></img>
                </div>
                <div className={styles.buttondiv}>
                  <CustomButton
                    onClick={handleButtonClick}
                    className={styles.button}
                  >
                    지금 시작하기
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles["gradient-bar"]}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 2,
          }}
          style={{
            zIndex: 0,
          }}
        >
          {/*<div className={styles["gradient-bar"]}></div>*/}
        </motion.div>

      </div>
    </EdgeGradient>
  );
}

export default LandingPage;
