import Header from "../../components/Header/Header";
import logoImage from "../../assets/images/logoImage.svg";
import useDevice from "../../hooks/useDevice";
import styles from "./MyPage.module.scss";
import { useCallback, useEffect, useState, useRef } from "react";
import { getIdolData } from "../../api";
import leftIcon from "../../assets/icons/lefticon.png";
import rightIcon from "../../assets/icons/righticon.png";
import plusIcon from "../../assets/icons/plusIcon.png";
import IdolCard from "../../components/IdolCard/IdolCard";
import CustomButton from "../../components/CustomButtom/CustomButton";
import Refresh from "../../components/Refresh/Refresh";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import backgroundImg from "../../assets/images/Vector 3.png";
import MyPageLoading from "./MyPageLoading";

function MyPage() {
  const { mode } = useDevice();
  const [favoriteIdolList, setFavoriteIdolList] = useState([]); //관심있는 아이돌
  const [idolList, setIdolList] = useState([]); // 관심 아이돌 제외한 아이돌들
  const [cursors, setCursors] = useState([]); // 페이지 커서 히스토리(이전 페이지 저장)
  const [currentPage, setCurrentPage] = useState(0); //현재 페이지
  const [nextCursor, setNextCursor] = useState(null); //다음 페이지 커서

  const [selectedIdols, setSelectedIdols] = useState([]); // 선택된 아이돌
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayIdolList, setDisplayIdolList] = useState([]);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const isTouchDevice = () =>
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const handleStart = (e) => {
    if (isTouchDevice()) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = e.clientX; // 마우스 이벤트의 경우
    }
    touchEndX.current = null;
  };

  const handleMove = (e) => {
    if (isTouchDevice()) {
      touchEndX.current = e.touches[0].clientX;
    } else {
      touchEndX.current = e.clientX; // 마우스 이벤트의 경우
    }
  };

  const handleEnd = () => {
    if (!touchStartX.current || touchEndX.current === null) return;

    const difference = touchStartX.current - touchEndX.current;
    const threshold = window.innerWidth * 0.1; // 화면 너비의 20%로 설정

    if (difference > threshold && nextCursor) {
      handleNextPage(); // 다음 페이지
    } else if (difference < -threshold && currentPage > 0) {
      handlePrevPage(); // 이전 페이지
    }

    // 초기화
    touchStartX.current = null;
    touchEndX.current = null;
  };

  let pageSize = 16;
  if (mode === "tablet") {
    pageSize = 8;
  } else if (mode === "mobile") {
    pageSize = 6;
  }

  const getIdolList = useCallback(async () => {
    let myPageSize = pageSize;
    let cursor = null;

    if (idolList.length > 0) {
      myPageSize = myPageSize - 1;
      cursor = idolList[0].id;
    }
    const idolData = await getIdolData({
      pageSize: myPageSize,
      cursor: cursor,
    });

    if (idolList.length > 0) {
      setDisplayIdolList([idolList[0], ...idolData.list]);
    } else {
      setDisplayIdolList([...idolData.list]);
    }
  }, [idolList, pageSize]);

  /** cursor 없이 호출하면 자동으로 null, cursor와 함께 호출하면 cursor 값 사용 */
  const fetchIdolList = async (cursor = null) => {
    setIsLoading(true);
    try {
      const idolData = await getIdolData({
        pageSize: pageSize,
        cursor: cursor,
      });
      if (idolData && idolData.list) {
        //관심있는 아이돌 제외한 아이돌들 보여주고, 이전에 클릭한 selectedIdols가져오기.
        const storedSelectedIdols = JSON.parse(
          localStorage.getItem("selectedIdols") || "[]"
        );
        const filteredList = idolData.list.filter(
          (idol) =>
            !favoriteIdolList.some((favIdol) => favIdol.id === idol.id) &&
            !storedSelectedIdols.some(
              (selectedIdol) => selectedIdol.id === idol.id
            )
        );
        setIdolList(filteredList);
        setNextCursor(idolData.nextCursor);
        setError(null);

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
      setError(error);
      setIsLoading(false);
      setSelectedIdols([]);
      localStorage.removeItem("selectedIdols");
    } finally {
      setIsLoading(false); // 데이터 fetching 완료 후 false로 설정
    }
  };

  useEffect(() => {
    fetchIdolList(cursors[currentPage] || null);
  }, [mode, favoriteIdolList]);

  useEffect(() => {
    getIdolList();
  }, [getIdolList, favoriteIdolList]);

  // 렌더링시 favoriteIdolList에 localStorage값 넣어주기.
  useEffect(() => {
    const storedData = localStorage.getItem("favoriteIdol");
    if (storedData) {
      const storedIdols = JSON.parse(storedData);
      setFavoriteIdolList(storedIdols);
    }

    const storedSelectedData = localStorage.getItem("selectedIdols");
    if (storedSelectedData) {
      const storedSelectedIdols = JSON.parse(storedSelectedData);
      setSelectedIdols(storedSelectedIdols.map((idol) => idol.id));
    }
  }, []);

  useEffect(() => {
    if (mode === "mobile") {
      if (isTouchDevice()) {
        window.addEventListener("touchstart", handleStart);
        window.addEventListener("touchmove", handleMove);
        window.addEventListener("touchend", handleEnd);
      }
    } else {
      window.addEventListener("mousedown", handleStart);
      window.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) handleMove(e);
      });
      window.addEventListener("mouseup", handleEnd);
    }

    return () => {
      // 모든 이벤트 리스너 제거
      window.removeEventListener("touchstart", handleStart);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("mousedown", handleStart);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
    };
  }, [mode]); // mode를 종속성 배열에 추가

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

  const handleDelete = (id) => {
    const deletedIdol = favoriteIdolList.find((idol) => idol.id === id);

    setFavoriteIdolList((prev) => prev.filter((idol) => idol.id !== id));

    setDisplayIdolList((prev) => [
      deletedIdol,
      ...prev.filter((idol) => idol.id !== deletedIdol.id),
    ]);

    // localStorage 업데이트
    const storedData = localStorage.getItem("favoriteIdol");
    if (storedData) {
      const storedIdols = JSON.parse(storedData);
      const updatedStoredIdols = storedIdols.filter((idol) => idol.id !== id);
      localStorage.setItem("favoriteIdol", JSON.stringify(updatedStoredIdols));
    }

    toast.success("삭제 완료!", {
      position: "top-right",
    });
  };

  /** 이미지 누를 때 클릭핸들러 */

  const handleClick = (idol) => {
    setSelectedIdols((prev) => {
      const newSelectedIds = prev.includes(idol.id)
        ? prev.filter((id) => id !== idol.id)
        : [...prev, idol.id];

      // localStorage에서 기존 선택된 아이돌들 가져오기
      const storedSelectedIdols = JSON.parse(
        localStorage.getItem("selectedIdols") || "[]"
      );

      if (prev.includes(idol.id)) {
        // 선택 해제하는 경우: localStorage에서도 제거
        const updatedSelectedIdols = storedSelectedIdols.filter(
          (storedIdol) => storedIdol.id !== idol.id
        );
        localStorage.setItem(
          "selectedIdols",
          JSON.stringify(updatedSelectedIdols)
        );
      } else {
        // 선택하는 경우: localStorage에 추가
        const updatedSelectedIdols = [...storedSelectedIdols, idol];
        localStorage.setItem(
          "selectedIdols",
          JSON.stringify(updatedSelectedIdols)
        );
      }

      return newSelectedIds;
    });
  };

  /** 추가하기 버튼 누를 때 */
  const handleAddClick = () => {
    // 클릭한 아이돌데이터 selectedIdolsData에 넣어주고
    const selectedIdolsData = JSON.parse(
      localStorage.getItem("selectedIdols") || "[]"
    );
    const storedData = localStorage.getItem("favoriteIdol");
    const storedIdols = storedData ? JSON.parse(storedData) : [];

    //combinedIdols에 localstorage에 있던 데이터 넣어주고
    const combinedIdols = [...storedIdols];
    // 새롭게 선택된 데이터 넣어주기.
    selectedIdolsData.forEach((idol) => {
      if (!combinedIdols.some((item) => item.id === idol.id)) {
        combinedIdols.push(idol);
      }
    });

    localStorage.setItem("favoriteIdol", JSON.stringify(combinedIdols));

    setFavoriteIdolList(combinedIdols);

    //TODO : storedIdols에 있는 데이터를 idolList에서 빼주기.

    // combinedIdols에 있는 id와 일치하지 않는 아이돌만 남기기
    // combinedIdols에 있는 id와 IdolList에 있는 id의 중복이 없는 경우에만 새 아이돌을 추가함.
    let newIdolList = idolList.filter(
      (idol) =>
        !combinedIdols.some((selectedIdol) => selectedIdol.id === idol.id)
    );
    setIdolList(newIdolList);

    //선택된 아이돌 초기화
    localStorage.removeItem("selectedIdols");
    setSelectedIdols([]);

    toast.success("추가 완료!", {
      position: "top-right",
    });
  };

  return (
    <div>
      <Header />
      <img
        style={{ position: "absolute", top: "0", zIndex: "9" }}
        src={backgroundImg}
        alt="배경그라데이션"
      />
      <main className={styles.mypage__main}>
        <section className={styles.favorite_section}>
          <h2 className={styles.section__title}>내가 관심있는 아이돌</h2>
          <div className={styles.favorite__container}>
            <div className={styles.favorite__empty}>
              {favoriteIdolList.length === 0 && (
                <div className={styles.favorite__empty__container}>
                  <img
                    src={logoImage}
                    className={styles.favorite__empty_image}
                    alt="빈 상태 이미지"
                  />
                  <p className={styles.favorite__empty_text}>
                    좋아하는 아이돌을 추가해보세요.
                  </p>
                </div>
              )}
              <ul className={`${styles.favorite_idol_list} ${styles[mode]}`}>
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

        <div className={styles.mypage__divider_container}>
          <hr className={styles.mypage__divider} aria-hidden="true" />
        </div>
        <section className={styles.add_section}>
          <h2 className={styles.section__title}>
            관심 있는 아이돌을 추가해보세요.
          </h2>
          {error ? (
            <Refresh handleLoad={fetchIdolList} height={402} />
          ) : !isLoading ? (
            <div className={styles.add_idol_wrap}>
              {mode !== "mobile" && (
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
              )}

              <ul
                className={`${styles.add_idol_list} ${styles[mode]}`}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleStart} // 마우스 이벤트 추가
                onMouseMove={(e) => {
                  if (e.buttons === 1) handleMove(e); // 마우스를 누르고 이동할 때만 처리
                }}
                onMouseUp={handleEnd}
              >
                {displayIdolList.map((idol) => (
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
              {mode !== "mobile" && (
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
              )}
            </div>
          ) : (
            /** 여기 skeleton UI 구현 */
            <div className={styles.add_idol_wrap}>
              <button className={styles.card_handleButton} disabled={true}>
                <img
                  className={styles.card_handleButton_img}
                  src={leftIcon}
                  alt="왼쪽 버튼"
                />
              </button>

              <ul className={`${styles.add_idol_list} ${styles[mode]}`}>
                {[
                  ...Array(mode === "mobile" ? 6 : mode === "tablet" ? 8 : 16),
                ].map((_, index) => (
                  <li
                    key={`skeleton-${index}`}
                    className={styles.add_idol__container}
                  >
                    <div className={styles.idol_card_skeleton}>
                      <div className={styles.skeleton_image}>
                        <MyPageLoading width="128px" height="128px" />
                      </div>
                      <div className={styles.add_idol_p__container}>
                        <div className={styles.skeleton_name}>
                          <MyPageLoading width="80px" height="16px" />
                        </div>
                        <div className={styles.skeleton_group}>
                          <MyPageLoading width="80px" height="14px" />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button className={styles.card_handleButton} disabled={true}>
                <img
                  className={styles.card_handleButton_img}
                  src={rightIcon}
                  alt="오른쪽 버튼"
                />
              </button>
            </div>
          )}
        </section>
        <section className={styles.add_idol_button_section}>
          {!isLoading && !error && (
            <CustomButton
              width={255}
              height={48}
              isRoundButton={true}
              onClick={handleAddClick}
            >
              <div className={styles.add_idol_button_content}>
                {" "}
                <img
                  src={plusIcon}
                  className={styles.add_idol_button_icon}
                  alt="플러스아이콘"
                />
                <span className={styles.add_idol_button_text}>추가하기</span>
              </div>
            </CustomButton>
          )}
        </section>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default MyPage;
