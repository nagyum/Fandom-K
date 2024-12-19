import styles from "./MyCredit.module.scss";
import useCredit from "../../hooks/useCredit";
import creditIcon from "../../assets/icons/credit.png"


function MyCredit({handleMyCreditModal,}) {
//크레딧 모달을 띄우기 위한 함수
  const onClickAddBtn = () => {
    handleMyCreditModal();
  };
//레포지토리연결을 해야한다.


const {credit} = useCredit();

 return (
    <div className={styles.credit_state}>
      <div>
        내크레딧
        <img className={styles.creditIcon} src={creditIcon} alt="creditIcon" />
        {credit.toLocaleString()}
      </div>
      <button onClick={onClickAddBtn}>충전하기</button>
    </div>
  );
}

export default MyCredit;
