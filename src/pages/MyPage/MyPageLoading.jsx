import styles from "./MyPageLoading.module.scss";

function MyPageLoading({ width, height }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width || "100%", height: height || "16px" }}
    ></div>
  );
}

export default MyPageLoading;
