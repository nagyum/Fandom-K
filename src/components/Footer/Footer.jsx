import styles from "./Footer.module.scss";
import githubImage from "../../assets/images/githubImage.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleGithubClick = () => {
    window.open(
      "https://github.com/nagyum/Fandom-K",
      "_blank",
      "noopener,noreferrer"
    );
  };
  return (
    <div className={styles.teamName}>
      <span>@ Codeit 2024, Inc.</span>
      <div>@codeit-Team 12</div>

      <div className={styles.footer_github} onClick={handleGithubClick}>
        <img src={githubImage} width="20" />
        <span>GitHub</span>
      </div>
    </div>
  );
}

export default Footer;
