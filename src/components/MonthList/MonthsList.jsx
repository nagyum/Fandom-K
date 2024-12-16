import { useState, useEffect } from "react";
import { getChartData } from "../../api";
import CustomButton from "../CustomButtom/CustomButton";
import chartIMG from "../../assets/icons/Chart.svg";
import styles from "./MonthsList.module.scss";
import IdolChart from "./components/IdolChart";

function MonthsList({ handleVoteModal }) {
  const [idolList, setIdolList] = useState([]);
  const [gender, setGender] = useState("female");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabClick = (selectedGender) => {
    setGender(selectedGender);
    setPageSize(10);
  };

  const handleMore = () => {
    setPageSize((prevPageSize) => prevPageSize + 10);
  };

  const onclickVoteBtn = () => {
    handleVoteModal();
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
        {sortedIdols?.map((idol, index) => (
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
      <div className={styles.moreBtn}>
        <CustomButton isMoreButton onClick={handleMore}>
          더보기
        </CustomButton>
      </div>

      {error && <p>{error}</p>}
    </div>
  );
}

export default MonthsList;
