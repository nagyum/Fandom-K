import styles from "./IdolCard.module.scss";
import deleteIcon from "../../assets/icons/deleteIcon.png";
import clickIcon from "../../assets/icons/clickIcon.png";

function IdolCard({
  imageUrl,
  name,
  group,
  isbig = true,
  onDelete, // x표시 있는 사진
  isClicked, //사진 선택되었는지
  onClick,
}) {
  return (
    <div
      className={`${styles.add_idol__container} ${
        isbig ? styles.big : styles.small
      }`}
    >
      {" "}
      {/** isbig이 true면 프로필 크기가 128*183, false면 98*150 */}
      {/** isClicked가 true면 클릭된 핑크색 배경 이미지, false면 그대로*/}
      {isClicked ? (
        <div className={styles.add_idol_image_container}>
          <img src={clickIcon} className={styles.click_icon} />
          <img
            src={imageUrl}
            className={`${styles.add_idol_image_clicked} ${
              isbig ? styles.big : styles.small
            }`}
            onClick={onClick}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          className={`${styles.add_idol_image} ${
            isbig ? styles.big : styles.small
          }`}
          onClick={onClick}
        />
      )}
      {/** onDelete prop 받을때만 X 아이콘 뜨게 */}
      {onDelete && (
        <img
          src={deleteIcon}
          className={styles.delete_icon}
          onClick={onDelete}
        />
      )}
      <div className={styles.add_idol_p__container}>
        <p className={styles.add_idol_name}>{name}</p>
        <p className={styles.add_idol_group}>{group}</p>
      </div>
    </div>
  );
}

export default IdolCard;
