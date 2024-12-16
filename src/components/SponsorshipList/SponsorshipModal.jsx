import { useState } from "react";
import credit from "../../assets/icons/credit.png";
import styles from "./SponsorshipModal.module.scss";
import CustomButton from "../CustomButtom/CustomButton";
import { postDonation } from "../../api";

function SponsorshipModal({ data }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  //후원하기 버튼 클릭시 금액후원
  const onclickCreditBtn = async () => {
    setError("");
    if (input === "") {
      setError(`크레딧을 입력해주세요.`);
      return;
    }
    try {
      const result = await postDonation({ id: data.id, amount: input });
      data.receivedDonations = Number(data.receivedDonations) + Number(input);
      alert(`후원되었습니다.`);
      setInput("");
    } catch (e) {
      setError("서버 오류로 후원에 실패했습니다.");
      return;
    } finally {
      //로딩 false
    }
    //금액 후원 후 모달창 닫기
  };

  const credit_error = error ? `${styles.error}` : ``;

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
            className={`${styles.credit_input} ${credit_error}`}
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
        {error && <p className={styles.error_mes}>{error}</p>}
      </div>
      <CustomButton width={295} height={42} onClick={onclickCreditBtn}>
        후원하기
      </CustomButton>
    </div>
  );
}

export default SponsorshipModal;
