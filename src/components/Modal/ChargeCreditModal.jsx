import creditIcon from "../../assets/icons/credit.png";
import { useState } from "react";
import useCredit from "../../hooks/useCredit";
import CustomButton from "../CustomButtom/CustomButton";
import styles from "./ChargeCredit.module.scss";
import choiceCredit from "../../assets/icons/Radio.png";
import redRadio from "../../assets/icons/redRadio.png";

function ChargeCreditModal() {
  const [selectedCredit, setSelectedCredit] = useState(0); //크레딧의 현재상태표시
  const { addCredit } = useCredit();

  //크레딧 선택해서 충전하기
  const handleCreditSelect = (amount) => {
    setSelectedCredit(amount);
  };

  const handleCharge = () => {
    // if (selectedCredit > 0) {
    //   onCharge(selectedCredit); //충전금액 전달
    //   setSelectedCredit(0); //입력초기화
    // }
    if (selectedCredit > 0) {
      addCredit(selectedCredit); //선택한 금액만큼 크레딧 충전
      setSelectedCredit(0);
    }
  };

  return (
    <div className={styles.credit_modal}>
      <h2 className={styles.credit_title}>크레딧 충전하기</h2>
      <button
        className={`${styles.credit_choice} ${
          selectedCredit === 100 ? styles.selected : ""
        }`}
        onClick={() => handleCreditSelect(100)}
      >
        {/* styles.credit.choice를 통해 기본적인 스타일으 적용하고 뒤에 selectedCredit을 통해 조건에 따라 스타일 적용 */}
        <div>
          <img
            className={styles.charge_credit_icon}
            src={creditIcon}
            alt="creditImg"
          />{" "}
          100{" "}
        </div>
        <img
          className={styles.choice_credit_radio}
          src={selectedCredit === 100 ? redRadio : choiceCredit}
          alt="credit_radio"
        />
      </button>
      <button
        className={`${styles.credit_choice} ${
          selectedCredit === 500 ? styles.selected : ""
        }`}
        onClick={() => handleCreditSelect(500)}
      >
        <div>
          <img
            className={styles.charge_credit_icon}
            src={creditIcon}
            alt="creditImg"
          />{" "}
          500{" "}
        </div>
        {/* 선택하지 않을때는 라디오를 회색아이콘을 보여주고 선택했을 때는 빨간색아이콘을 보여준다. */}
        <img
          className={styles.choice_credit_radio}
          src={selectedCredit === 500 ? redRadio : choiceCredit}
          alt="credit_radio"
        />
      </button>
      <button
        className={`${styles.credit_choice} ${
          selectedCredit === 1000 ? styles.selected : ""
        }`}
        onClick={() => handleCreditSelect(1000)}
      >
        <div>
          <img
            className={styles.charge_credit_icon}
            src={creditIcon}
            alt="creditImg"
          />{" "}
          1000{" "}
        </div>
        <img
          className={styles.choice_credit_radio}
          src={selectedCredit === 1000 ? redRadio : choiceCredit}
          alt="credit_radio"
        />
      </button>
      <div>
        <p>선택된 금액: {selectedCredit} 크레딧</p>
        <CustomButton
          className={styles.charge_button}
          onClick={handleCharge}
          disabled={selectedCredit <= 0}
        >
          충전하기
        </CustomButton>
      </div>
    </div>
  );
}

export default ChargeCreditModal;
