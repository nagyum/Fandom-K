import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage/MyPage";
import ListPage from "./pages/ListPage";
import LandingPage from "./pages/LandingPage";
import "./styles/global.scss";
import api from "./api";

function App() {
  // const handleClick = async () => {
  //   try {
  //     const result = await api();
  //     console.log("API 응답:", result);
  //   } catch (error) {
  //     console.error("에러:", error);
  //   }
  // };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
      {/* <button onClick={handleClick}>보내기</button> */}
    </>
  );
}

export default App;
