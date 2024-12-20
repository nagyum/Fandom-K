import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage/MyPage";
import ListPage from "./pages/ListPage";
import LandingPage from "./pages/LandingPage";
import "./styles/global.scss";
import api from "./api";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
