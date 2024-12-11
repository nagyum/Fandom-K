// CustomButton.js
import styles from "../CustomButtom/styled.module.scss";

export default function CustomButton({ children, isRoundButton }) {
  return (
    <button className={`${styles.button} ${styles.roundendButton}`}>
      {children}
    </button>
  );
}
