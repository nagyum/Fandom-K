import {useEffect, useState} from "react";

const useCredit = () => {
    const [credit, setCredit] = useState(
      Number(localStorage.getItem("credit")) || 0
    );
  
    const addCredit = (value) => {
      setCredit((prev) => {
        const newValue = prev + value; //입력한 값과 기존의 밸류를 더한 값
        localStorage.setItem("credit", String(newValue)); 
        window.dispatchEvent(new CustomEvent("creditChange")); //그래서 여기서 CustomEvent를 사용해서 다른컴포넌트들에 이 변경사실을 알림
        return newValue;
      });
    };
  
    const subtractCredit = (value) => {
      setCredit((prev) => {
        const newValue = prev - value;
        localStorage.setItem("credit", String(newValue));
        window.dispatchEvent(new CustomEvent("creditChange")); //여기도 마찬가지
        return newValue;
      });
    };
  
    // 변경사항 감지
    useEffect(() => {
      const handleCreditChange = () => {
        setCredit(Number(localStorage.getItem("credit")));
      };
  
      window.addEventListener("creditChange", handleCreditChange); //여기서 creditChange 이벤트가 발생하면 handleCreditChange 실행시킴.
  
      return () => {
        window.removeEventListener("creditChange", handleCreditChange);
      };
    }, []);
  
    return {
      credit,
      addCredit,
      subtractCredit,
    };
  };
  

  

export default useCredit;

