import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import MonthsList from "../components/MonthList/MonthsList";
import MyCredit from "../components/MyCredit/MyCredit";
import SponsorshipList from "../components/SponsorshipList/SponsorshipList";
import useScrollTop from "../hooks/useScrollTop";
import SponsorshipModal from "../components/SponsorshipList/SponsorshipModal";
import ModalWrap from "../components/Modal/ModalWrap";
import MediaModalWrap from "../components/Modal/MediaModalwrap";
import VoteModal from "../components/MonthList/components/VoteModal";
import ChargeCreditModal from "../components/Modal/ChargeCreditModal";
import Footer from "../components/Footer/Footer";
import useDevice from "../hooks/useDevice"; // 미디어 쿼리

function ListPage() {
  const [modalContents, setModalContents] = useState(); // 모달 타입
  const [isModal, setIsModal] = useState(false); // 모달 열림 여부
  const [modalOpacity, setModalOpacity] = useState(100); // 모달 투명도
  const [sponsorData, setSponsorData] = useState();
  const [voteData, setVoteData] = useState();
  const [myCreditData, setMyCreditData] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [gender, setGender] = useState("female");

  const { mode } = useDevice(); // 모바일/데스크톱 감지
  useScrollTop(); // 스크롤 초기화

  // 모달이 열릴 때 배경 스크롤 비활성화
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

  // 후원 모달 열기
  const handleSponsorModal = (data) => {
    setIsModal(true);
    setSponsorData(data);
    setModalContents(1);
    setTimeout(() => {
      setModalOpacity(100);
    }, 0);
  };

  // 투표 모달 열기
  const handleVoteModal = (data) => {
    setIsModal(true);
    setVoteData(data);
    setModalContents(2);
    setTimeout(() => {
      setModalOpacity(100);
    }, 0);
  };
  //크레딧 충전 모달 팝업 띄우기
  const handleMyCreditModal = () => {
    setIsModal(true);

    // setMyCreditData(data);
    setModalContents(4);
    setTimeout(() => {
      setModalOpacity(100);
    }, 0);
  };

  // 크레딧 충전
  const handleCharge = (amount) => {
    setMyCreditData((prev) => prev + amount);
    setIsModal(false);
  };

  //모달 팝업 X버튼 클릭시 닫기
  const handleDeleteModal = () => {
    setModalOpacity(0);
    setTimeout(() => {
      setIsModal(false);
      setSponsorData(null);
      setVoteData(null);
    }, 200);
  };

  // 모달 내용 선택
  function ModalContents({ modalContents }) {
    switch (modalContents) {
      case 1:
        return <SponsorshipModal data={sponsorData} />;
      case 2:
        return (
          <VoteModal
            data={voteData}
            setPageSize={setPageSize}
            gender={gender}
          />
        );
      case 4:
        return <ChargeCreditModal onCharge={handleCharge} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Header />
      <MyCredit
        handleMyCreditModal={handleMyCreditModal}
        myCreditData={myCreditData}
      />
      <SponsorshipList handleSponsorModal={handleSponsorModal} />
      {isModal && (
        <ModalWrap
          style={{ opacity: `${modalOpacity}%` }}
          handleDeleteModal={handleDeleteModal}
        >
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
