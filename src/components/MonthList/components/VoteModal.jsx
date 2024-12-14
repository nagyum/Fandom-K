import React, { useState, useEffect } from "react";
import IdolVote from "../components/IdolVote";
import CustomButton from "../../CustomButtom/CustomButton";
import CreditModal from "../../Modal/LackingCredit";
import styles from "../MonthsList.module.scss";

function VoteModal({ data: idolList, setPageSize }) {
  const [error, setError] = useState(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  const handleVoteClick = () => {
    const userCredits = 0;
    if (userCredits < 1000) {
      setIsCreditModalOpen(true);
    } else {
      alert("투표가 완료되었습니다!");
    }
  };

  const closeModal = () => {
    setIsCreditModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <div>
        <h1>이달의 여자 아이돌</h1>
        {idolList?.length > 0 ? (
          <ul>
            {idolList.map((idol, index) => (
              <IdolVote
                key={`${idol.id}-${index}`}
                rank={index + 1}
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
              />
            ))}
          </ul>
        ) : (
          <p>{error || "데이터가 없습니다."}</p>
        )}
        <div>
          <CustomButton isMoreButton>더보기</CustomButton>
        </div>
        <CustomButton
          className={styles.voteBtn}
          width={128}
          height={32}
          onClick={handleVoteClick}
        >
          <span>차트 투표하기</span>
        </CustomButton>
        <div>투표하는데 1000 크레딧이 소모됩니다.</div>
      </div>
      {/*크레딧 부족 모달*/}
      <CreditModal isOpen={isCreditModalOpen} onClose={closeModal} />
    </>
  );
}

export default VoteModal;
