import { useEffect, useState } from "react";
import creditImg from "../../assets/icons/credit.png";
import styles from "./SponsorshipModal.module.scss";
import CustomButton from "../CustomButtom/CustomButton";
import { postDonation } from "../../api";
import useCredit from "../../hooks/useCredit";

function SponsorshipModal({ data, handleDeleteModal, notifySponsor }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const credit = localStorage.getItem("credit");
  console.log(credit);
  const { subtractCredit } = useCredit();

  const handleInput = (e) => {
    setInput(e.target.value);
    if (Number(e.target.value) > Number(credit)) {
      setError("갖고 있는 크레딧보다 더 많이 후원할 수 없어요");
    } else {
      setError("");
    }
  };

  //후원하기 버튼 클릭시 금액후원
  const onclickCreditBtn = async () => {
    setError("");
    if (input === "") {
      setError(`크레딧을 입력해주세요.`);
      return;
    } else if (Number(input) > Number(credit)) {
      setError("갖고 있는 크레딧보다 더 많이 후원할 수 없어요");
      return;
    }
    try {
      const result = await postDonation({ id: data.id, amount: input });
      notifySponsor();
      data.receivedDonations = Number(data.receivedDonations) + Number(input);
      subtractCredit(Number(input));
      setInput("");
      handleDeleteModal();
    } catch (e) {
      setError("서버 오류로 후원에 실패했습니다.");
      return;
    } finally {
      //로딩 false
    }
    //금액 후원 후 모달창 닫기
  };

  const credit_error = error ? `${styles.error}` : ``;
  let submitBtn = `${styles.button_disable}`;
  if (input > 0 && error.length === 0) {
    submitBtn = ``;
  } else {
    submitBtn = `${styles.button_disable}`;
  }

  return (
    <>
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
              src={creditImg}
              alt="크레딧 이미지"
            />
            {error && <p className={styles.error_mes}>{error}</p>}
          </div>
        </div>
        <CustomButton
          className={submitBtn}
          width={295}
          height={42}
          onClick={onclickCreditBtn}
        >
          후원하기
        </CustomButton>
      </div>
    </>
  );
}

export default SponsorshipModal;
