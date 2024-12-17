import styles from "./MyCredit.modul.scss";
import useCredit from "../../hooks/useCredit";


function MyCredit({handleMyCreditModal,}) {
//크레딧 모달을 띄우기 위한 함수
  const onClickAddBtn = () => {
    handleMyCreditModal();
  };
//레포지토리연결을 해야한다.

const {credit} = useCredit();

 return (
    <div>
      <div>내크레딧:{credit.toLocaleString()}</div>
      <button onClick={onClickAddBtn}>충전하기</button>
    </div>
  );
}

export default MyCredit;
