import { useState, useEffect } from "react";

const useDevice = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 초기값 설정
  const [mode, setMode] = useState("desktop"); // mode 상태 추가

  // 화면 크기 변경에 따라 mode 업데이트
  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setMode("mobile");
      } else if (width < 1200) {
        setMode("tablet");
      } else {
        setMode("desktop");
      }
    };

    // 윈도우 리사이즈 이벤트 리스너
    window.addEventListener("resize", updateMode);
    updateMode(); // 초기값 설정

    return () => {
      window.removeEventListener("resize", updateMode);
    };
  }, [windowWidth]); // windowWidth 값이 바뀔 때마다 실행

  return { mode };
};

export default useDevice;
