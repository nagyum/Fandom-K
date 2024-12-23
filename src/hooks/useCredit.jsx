import { useEffect, useState } from "react";

const useCredit = () => {
    const [credit, setCredit] = useState(
      Number(localStorage.getItem("credit")) || 0
    );
  //크레딧 더하기 함수
    const addCredit = (value) => {
      setCredit((prev) => {
        const newValue = prev + value; //입력한 값과 기존의 밸류를 더한 값
        localStorage.setItem("credit", String(newValue)); //로컬스토리지에 저장
        window.dispatchEvent(new CustomEvent("creditChange")); //그래서 여기서 CustomEvent를 사용해서 다른컴포넌트들에 이 변경사실을 알림(window.dispatchEvent를 사용하여 커스텀이벤트 발생)
        return newValue;
      });
    };
  //크레딧 감소 함수
    const subtractCredit = (value) => {
      setCredit((prev) => {
        const newValue = prev - value; //현재 크레딧에서 감소
        localStorage.setItem("credit", String(newValue)); //로컬 스토리지에 저장
        window.dispatchEvent(new CustomEvent("creditChange")); //여기도 마찬가지로 상태변경 이벤트 발생
        return newValue;
      });
    };
  
    // 변경사항 감지
    useEffect(() => {
      const handleCreditChange = () => {
        setCredit(Number(localStorage.getItem("credit"))); // 로컬 스토리지의 값을 다시 가져옴
      };
  
      window.addEventListener("creditChange", handleCreditChange); //여기서 creditChange 이벤트가 발생하면 handleCreditChange 실행되어, 최신 크레딧 값을 로컬스토리지에서 가져온다.(이벤트 리스너 등록)
  
      return () => {
        window.removeEventListener("creditChange", handleCreditChange);// 컴포넌트 언마운트 시 리스너 제거
      };
    }, []);

  
    return {
      credit, //현재 크레딧 값
      addCredit, // 입력된 값만큼 크레딧을 증가.
      subtractCredit, //입력된 값만큼 크레딧을 감소
    };
  };
  

  // 브라우저 종료 시 localStorage 초기화

export default useCredit;
