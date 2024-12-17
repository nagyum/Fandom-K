import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import MonthsList from "../components/MonthList/MonthsList";
import MyCredit from "../components/MyCredit/MyCredit";
import SponsorshipList from "../components/SponsorshipList/SponsorshipList";
import useScrollTop from "../hooks/useScrollTop";
import SponsorshipModal from "../components/SponsorshipList/SponsorshipModal";
import ModalWrap from "../components/Modal/ModalWrap";
import VoteModal from "../components/MonthList/components/VoteModal";
import Footer from "../components/Footer/Footer";

function ListPage() {
  const [modalContents, setModalContents] = useState(); // 1,2,3,4
  //모달이 열렸는지
  const [isModal, setIsModal] = useState(false);
  //opacity로 modal 애니메이션주기
  const [modalOpacity, setModalOpacity] = useState(100);
  //데이터 상태관리
  const [sponsorData, setSponsorData] = useState();
  const [voteData, setVoteData] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [gender, setGender] = useState("female");
  useScrollTop();

  // 모달 상태에 따라 배경 스크롤 비활성화
  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModal]);

  //후원 모달 팝업 띄우기
  const handleSponsorModal = (data) => {
    setIsModal(true);
    setSponsorData(data);
    setModalContents(1);
    setTimeout(() => {
      setModalOpacity(100);
    }, 0);
  };

  //투표 모달 팝업 띄우기
  const handleVoteModal = (data) => {
    setIsModal(true);
    setVoteData(data);
    setModalContents(2);
    setTimeout(() => {
      setModalOpacity(100);
    }, 0);
  };

  //모달 팝업 X버튼 클릭시 닫기
  const handleDeleteModal = () => {
    setModalOpacity(0);
    setTimeout(() => {
      setIsModal(false);
      setSponsorData();
      setVoteData();
    }, 200);
  };

  //1번 후원하기, 2번 투표하기, 3번 크레딧 부족, 4번 크레딧 충전
  function ModalContents({ modalContents }) {
    switch (modalContents) {
      case 1: //후원하기
        return <SponsorshipModal data={sponsorData} />;
      case 2: //투표하기
        return (
          <VoteModal
            data={voteData}
            setPageSize={setPageSize}
            gender={gender}
          />
        );
      default:
        break;
    }
  }

  return (
    <div>
      <Header />
      <MyCredit />
      <SponsorshipList handleSponsorModal={handleSponsorModal} />
      {isModal && (
        <ModalWrap handleDeleteModal={handleDeleteModal}>
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <ModalContents modalContents={modalContents} />
          </div>
        </ModalWrap>
      )}
      <MonthsList
        handleVoteModal={handleVoteModal}
        pageSize={pageSize}
        setPageSize={setPageSize}
        gender={gender}
        setGender={setGender}
      />
      <Footer />
    </div>
  );
}

export default ListPage;
