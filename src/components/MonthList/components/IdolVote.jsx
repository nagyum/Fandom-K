import React from "react";
import styles from "./IdolVote.module.scss";
import clickIcon from "../../../assets/icons/clickIcon.png";
import grayradio from "../../../assets/icons/Radio.png";
import redRadio from "../../../assets/icons/redRadio.png";

export default function IdolVote({
  imgUrl,
  group,
  name,
  totalVotes,
  rank,
  idolId,
  onSelect,
  isClicked, // 선택 여부
}) {
  const BASE_URL = "https://fandom-k-api.vercel.app";
  const handleComponentClick = () => {
    // 라디오 버튼 선택 상태 업데이트
    const radioButton = document.getElementById(`ckb-${rank}`);
    if (radioButton) {
      radioButton.checked = true; // 라디오 버튼 체크
      onSelect(idolId, true); // 아이돌 선택 상태 변경
    }
  };

  return (
    <>
      <li onClick={handleComponentClick}>
        <div className={styles.chartContents}>
          <div>
            <div
              className={`${styles.add_idol_image_container} ${
                isClicked ? styles.clicked : ""
              }`}
            >
              {/* 클릭 아이콘 */}
              <img
                src={clickIcon}
                className={styles.click_icon}
                style={{ opacity: isClicked ? 1 : 0 }} // 선택 상태에 따라 아이콘 표시
              />
              {/* 프로필 이미지 */}
              <div className={`${styles.add_idol_image_box}`}>
                <img
                  className={
                    isClicked
                      ? styles.add_idol_image_clicked
                      : styles.add_idol_image
                  }
                  src={`${BASE_URL}${imgUrl}`}
                  alt={`${group}-이미지`}
                />
              </div>
            </div>
          </div>
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
              name="idolSelect" // 동일 그룹으로 라디오 버튼 설정
              id={`ckb-${rank}`}
              checked={isClicked} // 선택 여부 반영
              onChange={(e) => onSelect(idolId, e.target.checked)} // 라디오 버튼 선택 상태 관리
            />
            <label className={styles.labelBtn} htmlFor={`ckb-${rank}`}>
              {" "}
              <img
                src={isClicked ? redRadio : grayradio} // 선택 여부에 따라 이미지 변경
                alt="radio"
                className={styles.radioImg}
              />
            </label>
          </div>
        </div>
      </li>
    </>
  );
}
