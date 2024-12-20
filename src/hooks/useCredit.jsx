import { useEffect, useState } from "react";

const useCredit = () => {
  const [credit, setCredit] = useState(
    Number(localStorage.getItem("credit")) || 0
  );

  // 브라우저 종료 시 localStorage 초기화

  const addCredit = (value) => {
    setCredit((prev) => {
      const newValue = prev + value;
      localStorage.setItem("credit", String(newValue));
      window.dispatchEvent(new CustomEvent("creditChange"));
      return newValue;
    });
  };

  const subtractCredit = (value) => {
    setCredit((prev) => {
      const newValue = prev - value;
      localStorage.setItem("credit", String(newValue));
      window.dispatchEvent(new CustomEvent("creditChange"));
      return newValue;
    });
  };

  // 변경사항 감지
  useEffect(() => {
    const handleCreditChange = () => {
      setCredit(Number(localStorage.getItem("credit")));
    };

    window.addEventListener("creditChange", handleCreditChange);

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
