// CustomButton.js
import styles from "../CustomButtom/Button.module.scss";

export default function CustomButton({
  children,
  width,
  height,
  isRoundButton,
  isMoreButton,
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button} ${
        isRoundButton ? styles.roundedButon : ""
      } ${isMoreButton ? styles.moreButton : ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children}
    </button>
  );
}

// <Custom Button
//   isRoundButton => 이 props를 주면 radius가 24px인 둥근 버튼
//   네모를 원하면 사용안하면 됨
// width,height props
// padding 까지 props로 줘야되는지..
// 여기에 className 지정해야 될때를 위해 className props
