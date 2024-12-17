import { useState } from "react";
import credit from "../../assets/icons/credit.png";
import styles from "./SponsorshipModal.module.scss";
import CustomButton from "../CustomButtom/CustomButton";

function SponsorshipModal({ data }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>후원하기</h1>
      <div className={styles.card_container}>
        <div className={styles.card_wrap}>
          <div>
            <img
              className={styles.card_img}
              src={data.idol.profilePicture}
              alt="아이돌 이미지"
            />
            <div className={styles.card_title_container}>
              <span className={styles.card_subtitle}>{data.subtitle}</span>
              <h2 className={styles.card_title}>{data.title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.credit_container}>
        <div className={styles.credit_input_container}>
          <input
            type="number"
            className={styles.credit_input}
            placeholder="크레딧 입력"
            onChange={handleInput}
            value={input}
          />
          <img
            className={styles.credit_logo}
            src={credit}
            alt="크레딧 이미지"
          />
        </div>
        <p className={styles.input_error}>
          갖고 있는 크레딧보다 더 많이 후원할 수 없어요
        </p>
      </div>
      <CustomButton width={295} height={42}>
        후원하기
      </CustomButton>
    </div>
  );
}

export default SponsorshipModal;
