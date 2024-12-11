import { getVote } from "../../api";
import React, { useState } from "react";
import credit from "../../assets/icons/credit.png";

function Modal() {
  const [pageSize, setPageSize] = useState(6);
  const handleLoad = () => {
    setPageSize(pageSize);
  };
  return (
    <>
      <div>
        <h1>이달의 여자 아이돌</h1>
        <div>
          <img />
          숫자 뉴진스 민지 표숫자 체크표시
        </div>
        <div> 버튼 투표하기</div>
        <div> 투표하는데 1000 크레딧이 소모됩니다.</div>
      </div>
      <div>
        <img src={credit} alt="creditImg" />앗 투표하기 위한 크레딧이 부족해요
        <button>확인</button>
      </div>
      <div>
        <h2>크레딧 충전하기</h2>
        <div>
          <img src={credit} alt="creditImg" /> 100{" "}
        </div>
        <div>
          <img src={credit} alt="creditImg" /> 500{" "}
        </div>
        <div>
          <img src={credit} alt="creditImg" /> 1000{" "}
        </div>
      </div>
    </>
  );
}

export default Modal;
