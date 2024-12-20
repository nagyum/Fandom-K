import { useEffect, useState } from "react";

const useDevice = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // 초기값 설정

  let mode = "desktop";

  if (windowWidth < 1200 && windowWidth >= 768) mode = "tablet";
  else if (windowWidth < 768) mode = "mobile";

  useEffect(() => {
    const handleResize = (event) => {
      setWindowWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // unmount 시 이벤트 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    mode,
  };
};

export default useDevice;
