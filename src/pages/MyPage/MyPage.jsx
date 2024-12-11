import Header from "../../components/Header/Header";
import logoImage from "../../assets/images/logoImage.png";
import useDevice from "../../hooks/useDevice";
import styles from "./MyPage.module.scss";
import { useEffect, useState } from "react";
import { getIdolData } from "../../api";

function MyPage() {
  const { mode } = useDevice();
  const [idolList, setIdolList] = useState([]);

  useEffect(() => {
    const fetchIdolList = async () => {
      let pageSize = 16;
      if (mode === "tablet") {
        pageSize = 8;
      } else if (mode === "mobile") {
        pageSize = 6;
      }
      const idolData = await getIdolData({
        pageSize: pageSize,
      });
      setIdolList(idolData.list);
    };

    fetchIdolList();
  }, [mode]);

  return (
    <div>
      <Header />
      <main className={styles.mypage__main}>
        <section className={styles.section}>
          <h2 className={styles.section__title}>내가 관심있는 아이돌</h2>
          <div className={styles.favorite__container}>
            <div className={styles.favorite__empty}>
              <img
                src={logoImage}
                className={styles.favorite__empty_image}
                alt="빈 상태 이미지"
              />
              <p className={styles.favorite__empty_text}>
                좋아하는 아이돌을 추가해보세요.
              </p>
            </div>
          </div>
        </section>

        <hr className={styles.mypage__divider} aria-hidden="true" />

        <section className={styles.section}>
          <h2 className={styles.section__title}>
            관심 있는 아이돌을 추가해보세요.
          </h2>
          <ul className={`${styles.add_idol_list} ${styles[mode]}`}>
            {idolList.map((idol) => (
              <li key={idol.id}></li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
