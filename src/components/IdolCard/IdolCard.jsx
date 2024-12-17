import styles from "./IdolCard.module.scss";
import deleteIcon from "../../assets/icons/deleteIcon.png";

function IdolCard({ imageUrl, name, group, isbig = true, onDelete }) {
  return (
    <div
      className={`${styles.add_idol__container} ${
        isbig ? styles.big : styles.small
      }`}
    >
      {" "}
      {/** isbig이 true면 프로필 크기가 128*183, false면 98*150 */}
      <img
        src={imageUrl}
        className={`${styles.add_idol_image} ${
          isbig ? styles.big : styles.small
        }`}
      />
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
