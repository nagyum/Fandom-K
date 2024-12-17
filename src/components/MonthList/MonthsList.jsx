import { useState, useEffect } from "react";
import { getChartData } from "../../api";
import CustomButton from "../CustomButtom/CustomButton";
import chartIMG from "../../assets/icons/Chart.svg";
import styles from "./MonthsList.module.scss";
import IdolChart from "./components/IdolChart";
import ListLoading from "./components/ListLoading";
import useDevice from "../../hooks/useDevice";

function MonthsList({
  handleVoteModal,
  pageSize,
  setPageSize,
  gender,
  setGender,
}) {
  const [idolList, setIdolList] = useState([]);
  // const [gender, setGender] = useState("female");
  // const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //미디어쿼리 pageSize 변경
  const { mode } = useDevice();

  useEffect(() => {
    if (mode === "tablet" || mode === "mobile") {
      setPageSize(5);
    } else if (mode === "desktop") {
      setPageSize(10);
    }
  }, [mode, setPageSize]);
  //탭 전환
  const handleTabClick = (selectedGender) => {
    setGender(selectedGender);
    setPageSize(pageSize);
  };
  //더보기 누를때
  const handleMore = () => {
    setPageSize((prevPageSize) => prevPageSize * 2);
  };

  //투표하기 버튼 클릭시 모달창 띄우기
  const onclickVoteBtn = () => {
    handleVoteModal(sortedIdols);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getChartData({ gender, pageSize });
        return data;
      } catch (err) {
        console.error("데이터를 가져오는 데 실패했습니다:", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        // 요청이 끝나면 로딩 상태를 false로 설정
        setLoading(false);
      }
    };

    fetchData().then((res) => {
      setIdolList(res?.idols || []);
      setError(null);
    });
  }, [gender, pageSize]);

  const sortedIdols = [...idolList].sort((a, b) => b.totalVotes - a.totalVotes);

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
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
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
          : sortedIdols?.map((idol, index) => (
              <IdolChart
                key={`${idol.id}-${index}`}
                rank={index + 1}
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
              />
            ))}
      </ul>
      {sortedIdols.length >= pageSize && !loading && (
        <div className={styles.moreBtn}>
          <CustomButton isMoreButton onClick={handleMore}>
            더보기
          </CustomButton>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}

export default MonthsList;
