import Header from "../../components/Header/Header";
import logoImage from "../../assets/images/logoImage.svg";
import useDevice from "../../hooks/useDevice";
import styles from "./MyPage.module.scss";
import { useEffect, useState } from "react";
import { getIdolData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import IdolCard from "../../components/IdolCard/IdolCard";
import CustomButton from "../../components/CustomButtom/CustomButton";

function MyPage() {
  const { mode } = useDevice();
  const [favoriteIdolList, setFavoriteIdolList] = useState([]); //관심있는 아이돌
  const [idolList, setIdolList] = useState([]); // 전체 아이돌
  const [cursors, setCursors] = useState([]); // 페이지 커서 히스토리(이전 페이지 저장)
  const [currentPage, setCurrentPage] = useState(0); //현재 페이지
  const [nextCursor, setNextCursor] = useState(null); //다음 페이지 커서
  const [isClicked, setIsClicked] = useState(false);
  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌

  /** cursor 없이 호출하면 자동으로 null, cursor와 함께 호출하면 cursor 값 사용 */
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

  /** 이전 페이지 누를 때 */
  const handlePrevPage = () => {
    if (currentPage > 0) {
      const prevCursor = cursors[currentPage - 1];
      setCurrentPage(currentPage - 1);
      fetchIdolList(prevCursor);
    }
  };
  /** 다음페이지 누를 때 */
  const handleNextPage = () => {
    if (nextCursor) {
      setCurrentPage(currentPage + 1);
      fetchIdolList(nextCursor);
    }
  };

  /** x버튼 누를 때 */
  //TODO : localStorage에서 관심있는 아이돌 지워주기.
  // FavoriteIdolList 에서 같은 id 지워주고, localStoage 에 넣어주기.
  const handleDelete = (id) => {
    setFavoriteIdolList((prev) => prev.filter((idol) => idol.id !== id));

    const storedData = localStorage.getItem("favoriteIdol");
    if (storedData) {
      const storedIdols = JSON.parse(storedData);
      const updateIdols = storedIdols.filter((idol) => idol.id !== id);
      localStorage.setItem("favoriteIdol", JSON.stringify(updateIdols));
    }
  };

  /** 이미지 누를 때 클릭핸들러 */
  // TODO : 이미지를 클릭할 때 해당아이돌의 배경색이 바뀌게 해야함.
  // 해당 아이돌의 id를 가져와서 그 아이돌의 상태를 바꿔야함.
  const handleClick = (idol) => {
    setSelectedIdols((prev) => {
      //이미 선택된 아이돌이면 제거
      if (prev.includes(idol.id)) {
        // selectedIdols에서 해당 id 제거
        return prev.filter((id) => id !== idol.id);
      }
      return [...prev, idol.id];
    });
  };

  /** 추가하기 버튼 누를 때 */
  // TODO : localstorage에 관심있는 아이돌 넣어주기
  const handleAddClick = () => {
    const selectedIdolsData = idolList.filter((idol) =>
      selectedIdols.includes(idol.id)
    );
    localStorage.setItem("favoriteIdol", JSON.stringify(selectedIdolsData));
    setFavoriteIdolList((prev) => {
      const newList = [...prev];
      selectedIdolsData.forEach((idol) => {
        //배열.some() 메소드로 중복제거하고, 새로운건 추가해주기.
        if (!newList.some((item) => item.id === idol.id)) {
          newList.push(idol);
        }
      });

      return newList;
    });
    //선택된 아이돌 초기화
    setSelectedIdols([]);
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
                {favoriteIdolList.map((idol) => (
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
                    onClick={() => handleClick(idol)}
                    isClicked={selectedIdols.includes(idol.id)}
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
        <section className={styles.add_idol_button_section}>
          <CustomButton
            width={255}
            height={48}
            isRoundButton={true}
            onClick={handleAddClick}
          >
            <div className={styles.add_idol_button_content}>
              {" "}
              <img src={plusIcon} className={styles.add_idol_button_icon} />
              <span className={styles.add_idol_button_text}>추가하기</span>
            </div>
          </CustomButton>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
