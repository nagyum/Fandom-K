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
  // const [translateX, setsTranslateX] = useState(0);

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

  useEffect(() => {
    handleLoadSponsor();
  }, []);

  function SponsorShipCaracel() {
    //버튼 컴포넌트 opacity 애니메이션
    const [leftBtnOpa, setLeftBtnOpa] = useState(0);
    const [rightBtnOpa, setRightBtnOpa] = useState(100);
    //버튼 컴포넌트 pointer 없애기
    const [leftBtnCursor, setLeftBtnCursor] = useState("none");
    const [rightBtnCursor, setRightBtnCursor] = useState("auto");
    //버튼 컴포넌트 클릭시 애니메이션 추가
    const [transition, setTransition] = useState("none");
    const [btnIsLoading, setBtnIsLoading] = useState(false);

    // 캐러셀, 282px(카드 크기) + 24px(여백 크기) = 306px씩 이동
    let transform = `translateX(0px)`;
    const onclickLeftButton = () => {
      const result = getTranslateX();
      console.log(result);
      if (btnIsLoading || result === 0) {
        return;
      }
      setBtnIsLoading(true);
      setTransition("all 1s");
      if (Math.abs(result) % 306 === 0) {
        onRightBtn();
        if (result + 306 === 0) {
          offLeftBtn();
        }
        setTranslateX(result + 306);
      } else {
        onRightBtn();
        const count = Math.floor(Math.abs(result) / 306);
        if (count === 0) {
          offLeftBtn();
        }
        setTranslateX(count * -306);
      }
      setTimeout(() => {
        setTransition("none");
        setBtnIsLoading(false);
      }, 1000);
    };

    const onclickRightButton = () => {
      const result = getTranslateX();
      console.log(result);
      if (btnIsLoading || result === -612) {
        return;
      }
      setBtnIsLoading(true);
      setTransition("all 1s");
      if (Math.abs(result) % 306 === 0) {
        onLeftBtn();
        if (result - 306 <= -612) {
          offRightBtn();
        }
        setTranslateX(result - 306);
      } else {
        onLeftBtn();
        if (result - 306 <= -612) {
          offRightBtn();
        }
        const count = Math.ceil(Math.abs(result) / 306);
        setTranslateX(count * -306);
      }
      setTimeout(() => {
        setTransition("none");
        setBtnIsLoading(false);
      }, 1000);
    };

    const offLeftBtn = () => {
      setLeftBtnOpa(0);
      setLeftBtnCursor("none");
    };

    const onLeftBtn = () => {
      setLeftBtnOpa(100);
      setLeftBtnCursor("auto");
    };

    const offRightBtn = () => {
      setRightBtnOpa(0);
      setRightBtnCursor("none");
    };

    const onRightBtn = () => {
      setRightBtnOpa(100);
      setRightBtnCursor("auto");
    };

    //터치 스크롤 가능하게 하기
    const listRef = useRef();
    console.log(listRef.current);
    useTouchScroll(listRef, offLeftBtn, onLeftBtn, offRightBtn, onRightBtn);

    const getTranslateX = useCallback(() => {
      return parseInt(
        getComputedStyle(listRef.current).transform.split(/[^\-0-9]+/g)[5]
      );
    }, [listRef]);

    const setTranslateX = useCallback(
      (x) => {
        listRef.current.style.transform = `translateX(${x}px)`;
      },
      [listRef]
    );

    return (
      <>
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
          <div
            className={styles.card_list_container}
            style={{ transform: transform, transition: `${transition}` }}
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
      </>
    );
  }

  return (
    <div className={styles.sponsor_wrap}>
      <div className={styles.sponsor_title_wrap}>
        <h1 className={styles.sponsor_title}>후원을 기다리는 조공</h1>
      </div>
      {error ? (
        <Refresh handleLoad={handleLoadSponsor} height={402} />
      ) : IsLoading ? (
        <div
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
              <SponsorLoading width="260px" height="260px" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                }}
              >
                <SponsorLoading width="220px" height="30px" />
                <SponsorLoading width="260px" height="5px" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.card_wrap}>
          <SponsorShipCaracel />
        </div>
      )}
    </div>
  );
}

export default SponsorshipList;
