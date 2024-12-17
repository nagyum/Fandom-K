import { useState } from "react";
import Header from "../components/Header/Header";
import MonthsList from "../components/MonthList/MonthsList";
import MyCredit from "../components/MyCredit/MyCredit";
import SponsorshipList from "../components/SponsorshipList/SponsorshipList";
import useScrollTop from "../hooks/useScrollTop";
import SponsorshipModal from "../components/SponsorshipList/SponsorshipModal";
import ModalWrap from "../components/Modal/ModalWrap";
import VoteModal from "../components/MonthList/components/VoteModal";
import ChargeCreditModal from "../components/Modal/ChargeCreditModal";


function ListPage() {
  const [modalContents, setModalContents] = useState(); // 1,2,3,4
  const [isModal, setIsModal] = useState(false);
  //데이터 상태관리
  const [sponsorData, setSponsorData] = useState();
  const [voteData, setVoteData] = useState();
  const [myCreditData, setMyCreditData] = useState();
  useScrollTop();

  //후원 모달 팝업 띄우기
  const handleSponsorModal = (data) => {
    setIsModal(true);
    setSponsorData(data);
    setModalContents(1);
  };

  //투표 모달 팝업 띄우기
  const handleVoteModal = (data) => {
    setIsModal(true);
    setVoteData(data);
    setModalContents(2);
  };
  //크레딧 충전 모달 팝업 띄우기
  const handleMyCreditModal = (data) => {
    setIsModal(true);
    setMyCreditData(data);
    setModalContents(4);
  };
  //충전 크레딧 업데이트
  const handleCharge = (amount) => {
    setMyCreditData((prev)=> prev + amount);
    setIsModal(false);
  }





  //모달 팝업 X버튼 클릭시 닫기
  const handleDeleteModal = () => {
    setIsModal(false);
    setSponsorData();
    setVoteData();
  };

  //1번 후원하기, 2번 투표하기, 3번 크레딧 부족, 4번 크레딧 충전
  function ModalContents({ modalContents }) {
    switch (modalContents) {
      case 1: //후원하기
        return <SponsorshipModal data={sponsorData} />;
      case 2: //투표하기
        return <VoteModal />;
      case 4: //크레딧 충전
        return <ChargeCreditModal onCharge={handleCharge} />;
      default:
        break;
    }
  }

  return (
    <div>
      <Header />
      <MyCredit handleMyCreditModal={handleMyCreditModal} myCreditData={myCreditData} />
      <SponsorshipList handleSponsorModal={handleSponsorModal} />
      {isModal && (
        <ModalWrap handleDeleteModal={handleDeleteModal}>
          <ModalContents modalContents={modalContents} />
        </ModalWrap>
      )}
      <MonthsList handleVoteModal={handleVoteModal} />
    </div>
  );
}

export default ListPage;
