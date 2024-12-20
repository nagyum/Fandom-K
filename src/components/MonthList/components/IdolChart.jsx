import styles from "./IdolChart.module.scss";

export default function IdolChart({ imgUrl, group, name, totalVotes, rank }) {
  return (
    <li>
      <div
        className={styles.chartContents}
        style={{ maxWidth: "800px", height: "70px" }}
      >
        <img className={styles.img} src={imgUrl} alt={`${group}-이미지`} />

        <div className={styles.chartInfo}>
          <div className={styles.chartGroup}>
            <p className={styles.rank}>{rank}</p>
            <p>{group}</p>
            <p>{name}</p>
          </div>
          <div className={styles.chartVoteNum}>
            <p>{totalVotes}표</p>
          </div>
        </div>
      </div>
    </li>
  );
}
