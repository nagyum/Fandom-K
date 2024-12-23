import styles from "./SponsorLoading.module.scss";

function SponsorLoading({ width, height }) {
  return (
    <div
      className={styles.skeleton}
      style={{ width: width || "100%", height: height || "16px" }}
    ></div>
  );
}

export default SponsorLoading;
