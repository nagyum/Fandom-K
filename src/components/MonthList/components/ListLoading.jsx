import styles from "./ListLoading.module.scss";

function ListLoading({ width, height }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width || "100%", height: height || "16px" }}
    ></div>
  );
}

export default ListLoading;
