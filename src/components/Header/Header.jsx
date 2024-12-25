import useDevice from "../../hooks/useDevice";
import logoImage from "../../assets/images/logoImage.svg";
import userImage from "../../assets/images/userImage.png";
import styles from "./Header.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const { mode } = useDevice();
  const navigate = useNavigate();
  const location = useLocation();

  /* 로고 클릭시 실행되는 함수*/
  const handleLogoClick = () => {
    // 현재 페이지가 이미 /list라면 새로고침
    if (location.pathname === "/list") {
      window.location.reload();
    } else {
      navigate("/list");
    }
  };

  /** 프로필 클릭시 실행되는 함수 */
  const handleProfileClick = () => {
    navigate("/mypage");
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__content} ${styles[mode]}`}>
        <img
          src={logoImage}
          className={styles.header__logo}
          alt="Fandom K Logo"
          onClick={handleLogoClick}
        />
        <img
          src={userImage}
          className={styles.header__user}
          alt="User Profile"
          onClick={handleProfileClick}
        />
      </div>
    </header>
  );
}

export default Header;
