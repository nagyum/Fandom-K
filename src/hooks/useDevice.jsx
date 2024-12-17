import { useEffect, useState } from "react";

const useDevice = () => {
  const [windowWidth, setWindowWidth] = useState();

  let mode = "desktop";

  if (windowWidth < 1200 && windowWidth >= 768) mode = "tablet";
  else if (windowWidth < 768) mode = "mobile";

  useEffect(() => {
    const handleResize = (event) => {
      setWindowWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    /*unmount 될때 기존이벤트 제거*/
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    mode,
  };
};

export default useDevice;
