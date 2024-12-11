import styles from "../styled.module.scss";

export default function IdolChart({ imgUrl, group, name, totalVotes }) {
  return (
    <li>
      <div
        className={styles.chartContents}
        style={{ width: "588px", height: "70px" }}
      >
        <img className={styles.img} src={imgUrl} alt={`${group}-이미지`} />
        <div className={styles.chartInfo}>
          <p>{group}</p>
          <p>{name}</p>
          <p>{totalVotes}</p>
        </div>
      </div>
    </li>
  );
}
