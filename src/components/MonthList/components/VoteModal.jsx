import React, { useState, useEffect } from "react";
import { getChartData, postVote } from "../../../api";
import IdolVote from "../components/IdolVote";
import CustomButton from "../../CustomButtom/CustomButton";
import LackingCreditModal from "../../Modal/LackingCredit";
import styles from "./VoteModal.module.scss";
import useCredit from "../../../hooks/useCredit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 스타일 추가

function VoteModal({ data, gender, onVoteUpdate, onClose }) {
  const [error, setError] = useState(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [idolList, setIdolList] = useState(data);
  const [pageSize, setPageSize] = useState(7);
  const [selectedIdolId, setSelectedIdolId] = useState(null);

  const { credit, subtractCredit } = useCredit();

  const handleSelect = (idolId, isChecked) => {
    if (selectedIdolId === idolId) {
      // 이미 선택된 아이돌을 다시 클릭하면 선택 취소
      setSelectedIdolId(null);
    } else if (isChecked) {
      // 새로운 아이돌 선택
      setSelectedIdolId(idolId);
    }
  };

  const handleVoteClick = () => {
    if (!selectedIdolId) {
      toast.warn("아이돌을 먼저 선택해주세요");
      return;
    }

    if (credit < 1000) {
      setIsCreditModalOpen(true); // 크레딧 부족 시 LackingCreditModal 열기
    } else {
      const selectedIdol = idolList.find((idol) => idol.id === selectedIdolId); // 선택된 아이돌 찾기
      postVote(selectedIdolId)
        .then(() => {
          setIdolList((prevList) =>
            prevList.map((idol) =>
              idol.id === selectedIdolId
                ? { ...idol, totalVotes: idol.totalVotes + 1 }
                : idol
            )
          );
          subtractCredit(1000);

          toast.success(
            `${selectedIdol.group} ${selectedIdol.name} 투표 완료!`
          ); // 선택된 아이돌 이름 출력
        })
        .catch((err) => {
          toast.error("투표에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  const closeModal = () => {
    setIsCreditModalOpen(false); // CreditModal 닫기
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
  }, [gender, pageSize]);

  const sortedIdols = [...idolList].sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <>
      <div>
        <span className={styles.voteTitle}>{modalTitle}</span>
        {isCreditModalOpen ? (
          // CreditModal이 열려 있을 때 기존 모달 숨기기
          <LackingCreditModal isOpen={isCreditModalOpen} onClose={closeModal} />
        ) : (
          // CreditModal이 닫혀 있으면 기존 모달 보이기
          <ul className={`${styles.contents} ${styles.scrollbar}`}>
            {idolList.map((idol, index) => (
              <IdolVote
                key={idol.id}
                rank={index + 1}
                idolId={idol.id}
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
                onSelect={handleSelect}
                isClicked={selectedIdolId === idol.id}
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
        )}
      </div>

      {/* ToastContainer를 최상단에 위치시키기 */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default VoteModal;
