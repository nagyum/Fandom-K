import React from "react";
import styles from "./IdolVote.module.scss";

export default function IdolVote({
  imgUrl,
  group,
  name,
  totalVotes,
  rank,
  idolId,
  onSelect,
}) {
  const handleComponentClick = () => {
    const radioButton = document.getElementById(`ckb-${rank}`);
    if (radioButton) {
      radioButton.checked = true;
      onSelect(idolId, true); // 아이돌 선택 상태 변경
    }
  };
  return (
    <li onClick={handleComponentClick}>
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

          {/* 라디오 버튼 */}
          <input
            className={styles.inputBtn}
            type="radio"
            name="idolSelect" // 동일 그룹으로 설정
            id={`ckb-${rank}`}
            onChange={(e) => onSelect(idolId, e.target.checked)}
          />
          <label className={styles.labelBtn} htmlFor={`ckb-${rank}`}></label>
        </div>
      </div>
    </li>
  );
}
