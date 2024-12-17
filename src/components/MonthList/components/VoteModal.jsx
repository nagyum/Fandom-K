import { getVoteData } from "../../../api";
import React, { useState, useEffect } from "react";
import IdolChart from "../components/IdolChart";
import CustomButton from "../../CustomButtom/CustomButton";
import CreditModal from "../../Modal/LackingCredit";

function VoteModal() {
  const [IdolChart, setIdolChart] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [error, setError] = useState(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVoteData({ pageSize });
        return data;
      } catch (err) {
        console.error("데이터를 가져오는 데 실패했습니다:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      }
    };

    fetchData().then((res) => {
      setIdolChart(res?.idols || []);
      setError(null);
    });
  }, [pageSize]);

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
        {IdolChart?.length > 0 ? (
          <ul>
            {IdolChart.map((idol, index) => (
              <IdolChart
                key={`${idol.id}-${index}`}
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
        <CustomButton width={128} height={32} onClick={handleVoteClick}>
          <span>투표하기</span>
        </CustomButton>
        <div>투표하는데 1000 크레딧이 소모됩니다.</div>
      </div>
      {/*크레딧 부족 모달*/}
      <CreditModal isOpen={isCreditModalOpen} onClose={closeModal} />
    </>
  );
}

export default VoteModal;
