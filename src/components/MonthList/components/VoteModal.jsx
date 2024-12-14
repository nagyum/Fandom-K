import React, { useState, useEffect } from "react";
import { getChartData } from "../../../api";
import IdolVote from "../components/IdolVote";
import CustomButton from "../../CustomButtom/CustomButton";
import CreditModal from "../../Modal/LackingCredit";
import styles from "../MonthsList.module.scss";

function VoteModal({ data, gender }) {
  const [error, setError] = useState(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [idolList, setIdolList] = useState(data);
  const [pageSize, setPageSize] = useState(7);
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

  const modalTitle =
    gender === "female" ? "이 달의 여자 아이돌" : "이달의 남자 아이돌";

  const handleMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10);
  };

  useEffect(() => {
    //api 호출
    // api return 값을 setIdolList
    const fetchData = async () => {
      const data = await getChartData({ gender, pageSize });
      return data;
    };

    fetchData().then((res) => {
      setIdolList(res?.idols || []);
    });
  }, [pageSize]);
  const sortedIdols = [...idolList].sort((a, b) => b.totalVotes - a.totalVotes);
  return (
    <>
      <div>
        <span className="styles.voteTitle">{modalTitle}</span>
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
            <div>
              {sortedIdols.length >= pageSize && (
                <CustomButton
                  isMoreButton
                  onClick={handleMore}
                  className={styles.voteMore}
                >
                  더보기
                </CustomButton>
              )}
            </div>
            <CustomButton
              className={styles.voteBtn}
              height={42}
              onClick={handleVoteClick}
            >
              <span> 투표하기</span>
            </CustomButton>
            <div className={styles.voteCredit}>
              투표하는 데 <span style={{ color: "#F96D69" }}>1000 크레딧</span>
              이 소모됩니다.
            </div>
          </ul>
        ) : (
          <p>{error || "데이터가 없습니다."}</p>
        )}
      </div>
      {/*크레딧 부족 모달*/}
      <CreditModal isOpen={isCreditModalOpen} onClose={closeModal} />
    </>
  );
}

export default VoteModal;
