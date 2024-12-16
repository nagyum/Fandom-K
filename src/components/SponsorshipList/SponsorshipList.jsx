import { useEffect, useState } from "react";
import SponsorshipItem from "./SponsorShipItem";
import styles from "./SponsorshipList.module.scss";
import { getSponsershipData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";

function SponsorshipList({ handleSponsorModal }) {
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const handleLoad = async () => {
    try {
      //로딩 true
      setLoadingError(null);
      const result = await getSponsershipData();
      const { list } = result;
      setItems(list);
    } catch (e) {
      setLoadingError(e);
      return;
    } finally {
      //로딩 false
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

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.sponsor_wrap}>
      <div className={styles.sponsor_title_wrap}>
        <h1 className={styles.sponsor_title}>후원을 기다리는 조공</h1>
      </div>
      <div className={styles.card_wrap}>
        <div className={styles.card_handleButton} onClick={onclickLeftButton}>
          <img
            className={styles.card_handleButton_img}
            src={leftIcon}
            alt="왼쪽 버튼"
          />
        </div>
        <div className={styles.card_list}>
          {loadingError?.message && <span>{loadingError.message}</span>}
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
        <div className={styles.card_handleButton} onClick={onclickRightButton}>
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
