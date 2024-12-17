import useDevice from "../../hooks/useDevice";
import logoImage from "../../assets/images/logoImage.svg";
import userImage from "../../assets/images/userImage.png";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const { mode } = useDevice();
  const navigate = useNavigate();

  /* 로고 클릭시 실행되는 함수*/
  const handleLogoClick = () => {
    navigate("/list");
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
