import styles from "./IdolVote.module.scss";

export default function IdolVote({ imgUrl, group, name, totalVotes, rank }) {
  return (
    <li>
      <div style={{ width: "588px", height: "70px" }}>
        <div className={styles.chartContents}>
          <div>
            <img className={styles.img} src={imgUrl} alt={`${group}-이미지`} />
          </div>
          <div>
            <p className={styles.rank}>{rank}</p>
          </div>
          <div>
            <div className={styles.chartGroup}>
              <p>{group}</p>
              <p>{name}</p>
            </div>
            <p>{totalVotes}표</p>
          </div>

          <div>
            <input type="checkbox"></input>
          </div>
        </div>
      </div>
    </li>
  );
}
