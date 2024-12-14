import { useState } from "react";
import credit from "../../assets/icons/credit.png";
import styles from "./SponsorshipModal.module.scss";
import CustomButton from "../CustomButtom/CustomButton";
import { postDonation } from "../../api";

function SponsorshipModal({ data }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  //후원하기 버튼 클릭시 금액후원
  const onclickCreditBtn = async () => {
    if (input === "") {
      console.log(`숫자를 입력해주세요.`);
      return;
    }
    try {
      const result = await postDonation({ id: data.id, amount: input });
      console.log(`후원되었습니다.`);
      data.receivedDonations = Number(data.receivedDonations) + Number(input);
      setInput("");
    } catch (e) {
      return;
    } finally {
      //로딩 false
    }
    //금액 후원 후 모달창 닫기
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
      <CustomButton width={295} height={42} onClick={onclickCreditBtn}>
        후원하기
      </CustomButton>
    </div>
  );
}

export default SponsorshipModal;
