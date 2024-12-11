import Credit from "../../assets/icons/credit.png";
import styles from "./SponsorshipItem.module.css";

function SponsorshipItem({ item }) {
  //현재 날짜와 마감일의 차이를 일 단위로 출력
  const todayDate = new Date();
  const endDate = new Date(item.deadline);
  const diffTime = endDate.getTime() - todayDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  //진행도 바의 width길이 조절 (현재 카드 최대길이 282px)
  const progress = (item.receivedDonations / item.targetDonation) * 282;

  return (
    <div className={styles.card}>
      <div className={styles.card_img_container}>
        <img
          className={styles.card_img}
          alt="아이돌 이미지"
          src={item.idol.profilePicture}
        />
        <div className={styles.card_img_grdiant}></div>
        <button className={styles.card_button}>후원하기</button>
      </div>
      <div className={styles.card_description_container}>
        <div className={styles.card_title_container}>
          <span className={styles.card_advertising}>{item.subtitle}</span>
          <h1 className={styles.card_title}>{item.title}</h1>
        </div>
        <div className={styles.card_sponsor_container}>
          <div className={styles.card_credit_container}>
            <div className={styles.card_credit}>
              <img
                className={styles.card_credit_logo}
                alt="크레딧 로고"
                src={Credit}
              />
              <span className={styles.card_credit_count}>
                {item.receivedDonations}
              </span>
            </div>
            <p className={styles.card_deadline}>{diffDays}일 남음</p>
          </div>
          <div className={styles.card_goal}>
            <div
              className={styles.card_progress}
              style={{ width: progress }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorshipItem;
