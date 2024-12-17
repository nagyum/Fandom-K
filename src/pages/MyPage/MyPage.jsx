import Header from "../../components/Header/Header";
import logoImage from "../../assets/images/logoImage.svg";
import useDevice from "../../hooks/useDevice";
import styles from "./MyPage.module.scss";
import { useEffect, useState } from "react";
import { getIdolData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";
import IdolCard from "../../components/IdolCard/IdolCard";

function MyPage() {
  const { mode } = useDevice();
  const [favoriteIdolList, setFavoriteIdolList] = useState([]); //관심있는 아이돌
  const [idolList, setIdolList] = useState([]); // 전체 아이돌
  const [cursors, setCursors] = useState([]); // 페이지 커서 히스토리(이전 페이지 저장)
  const [currentPage, setCurrentPage] = useState(0); //현재 페이지
  const [nextCursor, setNextCursor] = useState(null); //다음 페이지 커서

  const fetchIdolList = async (cursor = null) => {
    try {
      let pageSize = 16;
      if (mode === "tablet") {
        pageSize = 8;
      } else if (mode === "mobile") {
        pageSize = 6;
      }
      const idolData = await getIdolData({
        pageSize: pageSize,
        cursor: cursor,
      });
      if (idolData && idolData.list) {
        setIdolList(idolData.list);
        setNextCursor(idolData.nextCursor);

        //현재 커서 히스토리에 저장하기.
        setCursors((prev) => {
          const newCursors = [...prev];
          newCursors[currentPage + 1] = cursor; //0번 index에는 null 값이 들어가 있으므로, currentPage + 1 에 해줘야한다.
          return newCursors;
        });
      }
    } catch (error) {
      console.error("fetch 실패", error);
      setIdolList([]);
    }
  };

  useEffect(() => {
    fetchIdolList();
  }, [mode]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      const prevCursor = cursors[currentPage - 1];
      setCurrentPage(currentPage - 1);
      fetchIdolList(prevCursor);
    }
  };

  const handleNextPage = () => {
    if (nextCursor) {
      setCurrentPage(currentPage + 1);
      fetchIdolList(nextCursor);
    }
  };

  const handleDelete = (id) => {
    setIdolList((prevList) => prevList.filter((idol) => idol.id !== id));
  };

  return (
    <div>
      <Header />
      <main className={styles.mypage__main}>
        <section className={styles.favorite_section}>
          <h2 className={styles.section__title}>내가 관심있는 아이돌</h2>
          <div className={styles.favorite__container}>
            <div className={styles.favorite__empty}>
              {/* <img
                src={logoImage}
                className={styles.favorite__empty_image}
                alt="빈 상태 이미지"
              />
              <p className={styles.favorite__empty_text}>
                좋아하는 아이돌을 추가해보세요.
              </p> */}
              <ul className={`${styles.add_idol_list} ${styles[mode]}`}>
                {idolList.map((idol) => (
                  <li key={idol.id}>
                    <IdolCard
                      imageUrl={idol.profilePicture}
                      name={idol.name}
                      group={idol.group}
                      isbig={false}
                      onDelete={() => handleDelete(idol.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <hr className={styles.mypage__divider} aria-hidden="true" />

        <section className={styles.add_section}>
          <h2 className={styles.section__title}>
            관심 있는 아이돌을 추가해보세요.
          </h2>
          <div className={styles.add_idol_wrap}>
            <button
              className={styles.card_handleButton}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <img
                className={styles.card_handleButton_img}
                src={leftIcon}
                alt="왼쪽 버튼"
              />
            </button>
            <ul className={`${styles.add_idol_list} ${styles[mode]}`}>
              {idolList.map((idol) => (
                <li key={idol.id}>
                  <IdolCard
                    imageUrl={idol.profilePicture}
                    name={idol.name}
                    group={idol.group}
                    isbig={true}
                  />
                </li>
              ))}
            </ul>
            <button
              className={styles.card_handleButton}
              onClick={handleNextPage}
              disabled={!nextCursor}
            >
              <img
                className={styles.card_handleButton_img}
                src={rightIcon}
                alt="오른쪽 버튼"
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
