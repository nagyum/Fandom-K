import { useEffect, useState } from "react";
import SponsorshipItem from "./SponsorShipItem";
import styles from "./SponsorshipList.module.scss";
import { getSponsershipData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";

function SponsorshipList({ handleSponsorModal }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [IsLoading, setIsloading] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  //버튼 컴포넌트 opacity 애니메이션
  const [leftBtnOpa, setLeftBtnOpa] = useState(100);
  const [rightBtnOpa, setRightBtnOpa] = useState(100);

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
    if (translateX === 0) return;
    setTranslateX((pre) => pre + 306);
  };

  const onclickRightButton = () => {
    if (translateX === -612) return;
    setTranslateX((pre) => pre - 306);
  };

  const btnOpacity = () => {
    if (translateX >= 0) {
      setLeftBtnOpa(0);
      setRightBtnOpa(100);
    } else if (0 > translateX > -612) {
      setLeftBtnOpa(100);
      setRightBtnOpa(100);
    } else if (-612 >= translateX) {
      setLeftBtnOpa(100);
      setRightBtnOpa(0);
      //오른쪽 버튼 안됨... 수정중..
    }
  };

  useEffect(() => {
    handleLoadSponsor();
  }, []);

  useEffect(() => {
    btnOpacity();
  }, [translateX]);

  return (
    <div className={styles.sponsor_wrap}>
      <div className={styles.sponsor_title_wrap}>
        <h1 className={styles.sponsor_title}>후원을 기다리는 조공</h1>
      </div>
      <div className={styles.card_wrap}>
        <div
          style={{ opacity: `${leftBtnOpa}%` }}
          className={styles.card_handleButton_l}
          onClick={onclickLeftButton}
        >
          <img
            className={styles.card_handleButton_img}
            src={leftIcon}
            alt="왼쪽 버튼"
          />
        </div>
        <div className={styles.card_list}>
          {IsLoading && <p>로딩중...</p>}
          {error?.message && <span>{error.message}</span>}
          <div
            className={styles.card_list_container}
            style={{ transform: style }}
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
          style={{ opacity: `${rightBtnOpa}%` }}
          className={styles.card_handleButton_r}
          onClick={onclickRightButton}
        >
          <img
            className={styles.card_handleButton_img}
            src={rightIcon}
            alt="오른쪽 버튼"
          />
        </div>
      </div>
    </div>
  );
}

export default SponsorshipList;
