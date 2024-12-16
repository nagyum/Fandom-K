import React from "react";
import "../styles/color.scss";
import "../styles/font.scss";
import logonobackground from "../assets/images/logonobackground.svg";
import styles from "../components/LandingPage/LandingPageStyles.module.scss";
import Section from "../components/LandingPage/Sections.jsx";
import images from "../components/LandingPage/LandingPageImages.jsx";

function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.h1div}>
        <h1 className={styles.white}>
          내가 좋아하는 아이돌을 <br />
          가장 <span className={styles["brand-orange"]}>쉽게 덕질</span> 하는
          방법
        </h1>
      </div>
      <div className={styles["image-container"]}>
        <div>
          <img src={logonobackground} alt="logo" />
        </div>
        <div>
          <img src={images.bgimg1} alt="bg1" />
        </div>
      </div>
      <div>{/* <button></button>*/}</div>
      <div className={styles["gradient-bar"]}>
        <div className={styles.page2}>
          <Section
            donate="후원하기"
            title={
              <>
                좋아하는 아이돌에게 <br /> 쉽게 조공해 보세요
              </>
            }
            bgimg={images.bgimg2}
            screenimg={images.screen1}
          />
        </div>
        <div className={styles.page3}>
          <Section
            donate="이달의 아티스트"
            title={
              <>
                내 아티스트에게 1등의 <br /> 영예를 선물하세요
              </>
            }
            bgimg={images.bgimg3}
            screenimg={images.screen2}
          />
        </div>
        <div className={styles.page4}>
          <Section
            donate="나만의 아티스트"
            title={
              <>
                좋아하는 아티스트들의 <br /> 소식을 모아보세요
              </>
            }
            bgimg={images.bgimg4}
            screenimg={images.screen3}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
