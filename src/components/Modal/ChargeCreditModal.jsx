import creditIcon from "../../assets/icons/credit.png";
import { useState } from "react";
import useCredit from "../../hooks/useCredit";

function ChargeCreditModal() {
  const [selectedCredit, setSelectedCredit] = useState(0); //크레딧의 현재상태표시
  const { addCredit} =useCredit();
  //크레딧충전하기

  const handleCreditSelect = (amount) => {
    setSelectedCredit(amount);
  };

  const handleCharge = () => {
    // if (selectedCredit > 0) {
    //   onCharge(selectedCredit); //충전금액 전달
    //   setSelectedCredit(0); //입력초기화
    // }
    if(selectedCredit>0){
      addCredit(selectedCredit);//선택한 금액만큼 크레딧 충전
      setSelectedCredit(0); 
    }
  };
  
  return (
    <div>
      <h2>크레딧 충전하기</h2>
        <button onClick={()=> handleCreditSelect(100)}>
          <img src={creditIcon} alt="creditImg" /> 100{" "}
        </button>
        <button onClick={()=> handleCreditSelect(500)}>
        <img src={creditIcon} alt="creditImg" /> 500{" "}
        </button>
        <button onClick={()=> handleCreditSelect(1000)}>
        <img src={creditIcon} alt="creditImg" /> 1000{" "}
        </button>
        <div>
          <p>
            선택된 금액: {selectedCredit} 크레딧
          </p>
          <button onClick={handleCharge} disabled={selectedCredit <= 0}>
            충전하기
          </button>
        </div>
    </div>
  );
}

export default ChargeCreditModal;