import styles from "./LoadingSpinner.module.scss";

function LoadingSpinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
