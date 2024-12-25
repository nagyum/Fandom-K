import { useState, useEffect } from "react";
import { getChartData } from "../../api";
import CustomButton from "../CustomButtom/CustomButton";
import chartIMG from "../../assets/icons/Chart.svg";
import styles from "./MonthsList.module.scss";
import IdolChart from "./components/IdolChart";
import ListLoading from "./components/ListLoading";
import Refresh from "../Refresh/Refresh";

function MonthsList({ handleVoteModal, pageSize, gender, setGender, isModal }) {
  const [idolList, setIdolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null); // 다음 커서

  const fetchData = async (cursor = null) => {
    setLoading(true);
    try {
      const data = await getChartData({ gender, pageSize, nextCursor });
      if (!data) return;

      setIdolList((prev) => [...prev, ...(data?.idols || [])]);
      setNextCursor(data?.nextCursor || null); // 다음 커서 업데이트
      setError(null);
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleMore = () => {
    if (nextCursor) {
      fetchData(nextCursor); // 현재 커서를 사용해 데이터 요청
    }
  };

  useEffect(() => {
    setIdolList([]); // 기존 데이터 초기화
    setNextCursor(null); // 커서 초기화
    fetchData(); // 초기 데이터 로드
  }, [gender, pageSize, isModal]);

  const sortedIdols = [...idolList].sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <div>
      <div className={styles.chartNav}>
        <h2>이달의 차트</h2>
        <CustomButton
          className={styles.chartBtn}
          width={128}
          height={32}
          onClick={() => handleVoteModal(sortedIdols)}
        >
          <img src={chartIMG} />
          <span>차트 투표하기</span>
        </CustomButton>
      </div>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            gender === "female" ? styles.activeTab : ""
          }`}
          onClick={() => setGender("female")}
        >
          이달의 여자 아이돌
        </button>
        <button
          className={`${styles.tab} ${
            gender === "male" ? styles.activeTab : ""
          }`}
          onClick={() => setGender("male")}
        >
          이달의 남자 아이돌
        </button>
      </div>
      <div className={styles.content}>
        {error ? (
          <div className={styles.errorContainer}>
            <Refresh
              style={{ width: "100%" }}
              handleLoad={fetchData}
              height={500}
            />
          </div>
        ) : loading ? (
          <ul className={styles.LankingChart}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <li key={index}>
                <ListLoading width="50px" height="50px" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.LankingChart}>
            {sortedIdols.map((idol, index) => (
              <IdolChart
                key={idol.id}
                rank={index + 1}
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
              />
            ))}
          </ul>
        )}

        {nextCursor && !loading && !error && (
          <div className={styles.moreBtn}>
            <CustomButton isMoreButton onClick={handleMore}>
              더보기
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthsList;
