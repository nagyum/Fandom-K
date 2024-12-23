import styles from "./MyCredit.module.scss";
import useCredit from "../../hooks/useCredit";
import creditIcon from "../../assets/icons/credit.png";
import { useEffect } from "react";

function MyCredit({ handleMyCreditModal }) {
  //크레딧 모달을 띄우기 위한 함수
  const onClickAddBtn = () => {
    handleMyCreditModal();
  };

  const { credit } = useCredit();

  return (
    <div className={styles.credit_state}>
      <div className={styles.credit_state_text}>
        <h1 className={styles.myCredit_title}>내 크레딧</h1>
        <p className={styles.myCredit_state_point}>
          <img
            className={styles.credit_icon}
            src={creditIcon}
            alt="creditIcon"
          />
          {credit.toLocaleString()}
        </p>
      </div>
      <button className={styles.credit_charge_button} onClick={onClickAddBtn}>
        충전하기
      </button>
    </div>
  );
}

export default MyCredit;
