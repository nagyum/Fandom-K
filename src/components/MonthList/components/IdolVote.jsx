import styles from "./IdolVote.module.scss";

export default function IdolChart({ imgUrl, group, name, totalVotes, rank }) {
  return (
    <li>
      <div
        className={styles.chartContents}
        style={{ width: "477px", height: "70px" }}
      >
        <img className={styles.img} src={imgUrl} alt={`${group}-이미지`} />

        <div className={styles.chartInfo}>
          <div className={styles.miniChart}>
            <div>
              <p className={styles.rank}>{rank}</p>
            </div>
            <div>
              <div className={styles.chartGroup}>
                <p>{group}</p>
                <p>{name}</p>
              </div>

              <p className={styles.vote}>{totalVotes}표</p>
            </div>
          </div>

          <input type="checkbox" id={`ckb-${rank}`} />
          <label htmlFor={`ckb-${rank}`}></label>
        </div>
      </div>
    </li>
  );
}
