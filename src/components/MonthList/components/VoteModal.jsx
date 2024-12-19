import React, { useState, useEffect } from "react";
import { getChartData, postVote } from "../../../api";
import IdolVote from "../components/IdolVote";

import CustomButton from "../../CustomButtom/CustomButton";
import CreditModal from "../../Modal/LackingCredit";
import styles from "./VoteModal.module.scss";

function VoteModal({ data, gender, onVoteUpdate }) {
  const [error, setError] = useState(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [idolList, setIdolList] = useState(data);
  const [pageSize, setPageSize] = useState(7);
  const [selectedIdolId, setSelectedIdolId] = useState(null); // 초기값 null

  const handleSelect = (idolId, isChecked) => {
    if (isChecked) {
      setSelectedIdolId(idolId); // 선택된 아이돌 ID 저장
    }
  };

  const handleVoteClick = () => {
    if (!selectedIdolId) {
      alert("아이돌을 먼저 선택해주세요");
      return;
    }

    const userCredits = 10000; // 유저 크레딧
    if (userCredits < 1000) {
      setIsCreditModalOpen(true); // 크레딧 부족 시 모달 오픈
    } else {
      postVote(selectedIdolId).then(() => {
        setIdolList((prevList) =>
          prevList.map((idol) =>
            idol.id === selectedIdolId
              ? { ...idol, totalVotes: idol.totalVotes + 1 }
              : idol
          )
        );
        alert("투표가 완료되었습니다!");
      });
    }
  };

  const closeModal = () => {
    setIsCreditModalOpen(false);
  };

  const modalTitle =
    gender === "female" ? "이 달의 여자 아이돌" : "이 달의 남자 아이돌";

  const handleMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10);
  };

  useEffect(() => {
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
        <span className={styles.voteTitle}>{modalTitle}</span>
        {idolList?.length > 0 ? (
          <ul className={styles.scrollbar}>
            {idolList.map((idol, index) => (
              <IdolVote
                key={idol.id}
                rank={index + 1}
                idolId={idol.id} // idolId 전달
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
                onSelect={handleSelect} // 선택 핸들러 전달
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
              <span>투표하기</span>
            </CustomButton>
            <div className={styles.voteCredit}>
              투표하는 데 &nbsp;
              <span style={{ color: "#F96D69" }}> 1000 크레딧</span>이
              소모됩니다.
            </div>
          </ul>
        ) : (
          <p>{error || "데이터가 없습니다."}</p>
        )}
      </div>
      <CreditModal isOpen={isCreditModalOpen} onClose={closeModal} />
    </>
  );
}

export default VoteModal;
