import { useState, useEffect } from "react";
import { getChartData } from "../../api";
import CustomButton from "../CustomButtom/CustomButton";
import chartIMG from "../../assets/icons/Chart.svg";
import styles from "./MonthsList.module.scss";
import IdolChart from "./components/IdolChart";
import ListLoading from "./components/ListLoading";
import useDevice from "../../hooks/useDevice";
import Refresh from "../Refresh/Refresh";

function MonthsList({
  handleVoteModal,
  pageSize,
  setPageSize,
  gender,
  setGender,
  isModal,
}) {
  const [idolList, setIdolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null); // nextCursor 상태 추가

  //미디어쿼리 pageSize 변경
  const { mode } = useDevice();

  if (mode === "tablet" || mode === "mobile") {
    setPageSize(5);
  } else if (mode === "desktop") {
    setPageSize(10);
  }

  //탭 전환
  const handleTabClick = (selectedGender) => {
    setGender(selectedGender);
    setPageSize(pageSize);
    setIdolList([]); // 탭 전환 시 리스트 초기화
    setNextCursor(null); // nextCursor 초기화
  };

  // 더보기 누를 때
  const handleMore = async () => {
    if (!nextCursor) return;

    setLoading(true);
    try {
      const data = await getChartData({ gender, pageSize, nextCursor });
      setIdolList((prev) => [...prev, ...data.idols]); // 기존 리스트에 새 데이터 추가
      setNextCursor(data.nextCursor); // 다음 커서 갱신
    } catch (err) {
      console.error("데이터를 가져오는 데 실패했습니다:", err);
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  //투표하기 버튼 클릭 시 모달창 띄우기
  const onclickVoteBtn = () => {
    handleVoteModal(idolList);
  };

  // fetchData 함수 정의
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getChartData({ gender, pageSize });
      setIdolList(data.idols || []);
      setNextCursor(data.nextCursor || null); // 초기 nextCursor 설정
      setError(null);
    } catch (err) {
      console.error("데이터를 가져오는 데 실패했습니다:", err);
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gender, pageSize, isModal]);

  return (
    <div>
      {/* 제목 UI */}
      <div className={styles.chartNav}>
        <h2>이달의 차트</h2>
        <CustomButton
          className={styles.chartBtn}
          width={128}
          height={32}
          onClick={onclickVoteBtn}
        >
          <img src={chartIMG} />
          <span>차트 투표하기</span>
        </CustomButton>
      </div>
      {/* 탭 UI */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            gender === "female" ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("female")}
        >
          이달의 여자 아이돌
        </button>
        <button
          className={`${styles.tab} ${
            gender === "male" ? styles.activeTab : ""
          }`}
          onClick={() => handleTabClick("male")}
        >
          이달의 남자 아이돌
        </button>
      </div>
      {/* 아이돌 리스트 출력 */}
      <ul className={styles.LankingChart}>
        {error ? (
          <div className={styles.errorContainer}>
            <Refresh
              style={{ width: "100%" }}
              handleLoad={fetchData}
              height={500}
            />
          </div>
        ) : loading && !idolList.length ? (
          Array.from({ length: 10 }).map((_, index) => (
            <li key={index}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <ListLoading width="50px" height="50px" />
                <div style={{ flex: 1, gap: "10px" }}>
                  <ListLoading width="100px" height="16px" />
                  <ListLoading width="150px" height="12px" />
                </div>
              </div>
            </li>
          ))
        ) : (
          idolList?.map((idol, index) => (
            <IdolChart
              key={`${idol.id}-${index}`}
              rank={index + 1}
              imgUrl={idol.profilePicture}
              group={idol.group}
              name={idol.name}
              totalVotes={idol.totalVotes}
            />
          ))
        )}
      </ul>
      {nextCursor && !loading && (
        <div className={styles.moreBtn}>
          <CustomButton isMoreButton onClick={handleMore}>
            더보기
          </CustomButton>
        </div>
      )}
    </div>
  );
}

export default MonthsList;
