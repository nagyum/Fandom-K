import React from "react";
import "../styles/color.scss";
import "../styles/font.scss";
import "../styles/LandingPageStyles.css";
import logo from "../assets/images/logoImage.png";
import Section from "./Sections.jsx";
import images from "./LPimages.js";

function LandingPage() {
  return (
    <div className="black-200">
      <div className="h1div">
        <h1 className="white">
          내가 좋아하는 아이돌을 <br />
          가장 <span className="brand-orange">쉽게 덕질</span> 하는 방법
        </h1>
      </div>
      <div className="image-container">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <img src={images.bgimg1} alt="bg1" />
        </div>
      </div>
      <div>{/* <button></button>*/}</div>
      <div className="gradient-bar">
        <div className="page2">
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
        <div className="page3">
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
        <div className="page4">
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
