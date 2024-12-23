import { useCallback, useEffect, useRef, useState } from "react";
import SponsorshipItem from "./SponsorShipItem";
import styles from "./SponsorshipList.module.scss";
import { getSponsershipData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";
import useTouchScroll from "../../hooks/useTouchScroll";
import Refresh from "../Refresh/Refresh";
import SponsorLoading from "./SponsorLoading";

function SponsorshipList({ handleSponsorModal }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [IsLoading, setIsloading] = useState(false);
  const [translateX, setsTranslateX] = useState(0);
  //버튼 컴포넌트 opacity 애니메이션
  const [leftBtnOpa, setLeftBtnOpa] = useState(0);
  const [rightBtnOpa, setRightBtnOpa] = useState(100);
  //버튼 컴포넌트 pointer 없애기
  const [leftBtnCursor, setLeftBtnCursor] = useState("none");
  const [rightBtnCursor, setRightBtnCursor] = useState("auto");
  //버튼 컴포넌트 클릭시 애니메이션 추가
  const [transition, setTransition] = useState("none");
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  //터치 스크롤 가능하게 하기
  const listRef = useRef();
  useTouchScroll(listRef);

  const handleLoadSponsor = async () => {
    try {
      setError(null);
      setIsloading(true);
      const result = await getSponsershipData();
      const { list } = result;
      setItems(list);
    } catch (e) {
      setError(e);
      return;
    } finally {
      setIsloading(false);
    }
  };

  // 캐러셀, 282px(카드 크기) + 24px(여백 크기) = 306px씩 이동
  let style = `translateX(${translateX}px)`;
  const onclickLeftButton = () => {
    //버튼 중복클릭 막기
    if (btnIsLoading) {
      return;
    }
    setBtnIsLoading(true);
    setTransition("all 1s");
    //첫 페이지에서 버튼 클릭 막기
    if (translateX === 0) {
      return;
    } else if (translateX === -306) {
      setLeftBtnOpa(0);
      setLeftBtnCursor("none");
    }
    setRightBtnOpa(100);
    setRightBtnCursor("auto");
    setsTranslateX((pre) => pre + 306);
    setTimeout(() => {
      setTransition("none");
      setBtnIsLoading(false);
    }, 1000);
  };

  const onclickRightButton = () => {
    //버튼 중복클릭 막기
    if (btnIsLoading) {
      return;
    }
    setBtnIsLoading(true);
    setTransition("all 1s");
    //마지막 페이지에서 버튼 클릭 막기
    if (translateX === -612) {
      return;
    } else if (translateX === -306) {
      setRightBtnOpa(0);
      setRightBtnCursor("none");
    }
    setLeftBtnOpa(100);
    setLeftBtnCursor("auto");
    setsTranslateX((pre) => pre - 306);
    setTimeout(() => {
      setTransition("none");
      setBtnIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleLoadSponsor();
  }, []);

  return (
    <div className={styles.sponsor_wrap}>
      <div className={styles.sponsor_title_wrap}>
        <h1 className={styles.sponsor_title}>후원을 기다리는 조공</h1>
      </div>
      {error ? (
        <Refresh handleLoad={handleLoadSponsor} height={402} />
      ) : IsLoading ? (
        <div
          className={styles.card_list_container}
          style={{ display: "flex", gap: "24px", margin: "0 auto" }} // Flexbox로 가로 정렬
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <SponsorLoading key={index} width="260px" height="260px" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <SponsorLoading key={index} width="220px" height="30px" />
                <SponsorLoading key={index} width="260px" height="5px" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.card_wrap}>
          <div
            style={{ opacity: `${leftBtnOpa}%`, pointerEvents: leftBtnCursor }}
            className={styles.card_handleButton}
            onClick={onclickLeftButton}
          >
            <img
              className={styles.card_handleButton_img}
              src={leftIcon}
              alt="왼쪽 버튼"
            />
          </div>
          <div className={styles.card_list}>
            {IsLoading && <p className={styles.loading}>로딩중...</p>}
            <div
              className={styles.card_list_container}
              style={{ transform: style, transition: `${transition}` }}
              ref={listRef}
            >
              {items.map((item) => {
                return (
                  <SponsorshipItem
                    key={item.id}
                    item={item}
                    handleSponsorModal={handleSponsorModal}
                  />
                );
              })}
            </div>
          </div>
          <div
            style={{
              opacity: `${rightBtnOpa}%`,
              pointerEvents: rightBtnCursor,
            }}
            className={styles.card_handleButton}
            onClick={onclickRightButton}
          >
            <img
              className={styles.card_handleButton_img}
              src={rightIcon}
              alt="오른쪽 버튼"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SponsorshipList;
