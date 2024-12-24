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
  const [nextCursor, setNextCursor] = useState(null); //더보기 커서

  const { mode } = useDevice();

  useEffect(() => {
    if (mode === "tablet" || mode === "mobile") {
      setPageSize(5);
    } else if (mode === "desktop") {
      setPageSize(10);
    }
  }, [mode, setPageSize]);

  const handleTabClick = (selectedGender) => {
    setGender(selectedGender);
    setPageSize(mode === "desktop" || (mode === "mobile" && "tablet") ? 10 : 5);
  };

  const handleMore = () => {
    setPageSize((prevPageSize) => prevPageSize * 2);
  };

  const onclickVoteBtn = () => {
    handleVoteModal(sortedIdols);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getChartData({ gender, pageSize });
      setIdolList(data?.idols || []);
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

  const sortedIdols = [...idolList].sort((a, b) => b.totalVotes - a.totalVotes);

  return (
    <div>
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
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <ListLoading width="50px" height="50px" />
                  <div>
                    <ListLoading width="100px" height="16px" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={styles.LankingChart}>
            {sortedIdols.map((idol, index) => (
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
        )}

        {sortedIdols.length >= pageSize && !loading && !error && (
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
