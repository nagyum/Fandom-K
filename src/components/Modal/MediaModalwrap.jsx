import styles from "./MediaModalWrap.module.scss";
import backBtn from "../../assets/icons/arrow-left.svg";
import backgroundImg from "../../assets/images/Vector 3.png";

function MediaModalWrap({ children, handleDeleteModal, style }) {
  //X버튼 혹은 뒷배경 클릭시 팝업창 닫기
  const onclickDeleteBtn = () => {
    handleDeleteModal();
  };

  return (
    <div className={styles.modal_wrap} style={style}>
      <div className={styles.modal}>
        <img className={styles.image} src={backgroundImg} />
        <img
          className={styles.modal_deleteBtn}
          src={backBtn}
          onClick={onclickDeleteBtn}
          alt="삭제 버튼"
        />
        {children}
      </div>
      {/* <div className={styles.modal_background} onClick={onclickDeleteBtn}></div> */}
    </div>
  );
}

export default MediaModalWrap;
