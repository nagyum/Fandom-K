import styles from "./MyCredit.module.scss";
import useCredit from "../../hooks/useCredit";
import creditIcon from "../../assets/icons/credit.png"
import {useEffect} from 'react';

function MyCredit({handleMyCreditModal,}) {
//크레딧 모달을 띄우기 위한 함수
  const onClickAddBtn = () => {
    handleMyCreditModal();
  };
//레포지토리연결을 해야한다.

//크레딧이 바뀔때마다 화면에 뿌려질 수 있게 해야한다. 로컬스토리지가 
//로컬스토리지에 추가되는 만큼 화면에도 추가하게 코드를 만든다.



const {credit} = useCredit();


 return (
    <div className={styles.credit_state}>
      <div className={styles.credit_state_text}>
        <h1 className={styles.myCredit_title}>내크레딧</h1>
        <p className={styles.myCredit_state_point}>
        <img className={styles.credit_icon} src={creditIcon} alt="creditIcon" />
        {credit.toLocaleString()}
        </p>
      </div>
      <button className={styles.credit_charge_button} onClick={onClickAddBtn}>충전하기</button>
    </div>
  );
}

export default MyCredit;
