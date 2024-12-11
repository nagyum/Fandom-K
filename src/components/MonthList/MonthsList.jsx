import { useState, useEffect } from "react";
import { getChartData } from "../../api";
import CustomButton from "../CustomButtom/CustomButton";
import chartIMG from "../../assets/icons/Chart.svg";
import styles from "./styled.module.scss";
import IdolChart from "./components/IdolChart";

function MonthsList() {
  const [idolList, setIdolList] = useState([]);
  const [gender, setGender] = useState("female");
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const data = await getChartData({ gender, pageSize });
        return data;
      } catch (err) {
        console.error("데이터를 가져오는 데 실패했습니다:", err); // 에러 로그 추가
        setError("데이터를 가져오는 데 실패했습니다."); // 에러 메시지 설정
      }
      // finally {
      //   setLoading(false); // 데이터 로딩 끝
      // }
    };

    fetchData().then((res) => {
      console.log("res", res);
      setIdolList(res?.idols);
      setError(null); // 에러 초기화
    });
  }, [gender, pageSize]);

  return (
    <>
      <div className={styles.Chart}>
        <h2>이달의 차트</h2>
        <CustomButton className={styles.chartBtn}>
          <img src={chartIMG} />
          차트 투표하기
        </CustomButton>

        <ul>
          {idolList?.map((idol, index) => {
            console.log("idol", idol);
            return (
              <IdolChart
                key={`${idol.id}-${index}`}
                imgUrl={idol.profilePicture}
                group={idol.group}
                name={idol.name}
                totalVotes={idol.totalVotes}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MonthsList;
