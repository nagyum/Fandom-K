import styles from "./ModalWrap.module.scss";
import deleteBtn from "../../assets/icons/btn_delete.png";
import useDevice from "../../hooks/useDevice";

function ModalWrap({ children, handleDeleteModal, style }) {
  //X버튼 혹은 뒷배경 클릭시 팝업창 닫기
  const onclickDeleteBtn = () => {
    handleDeleteModal();
  };

  return (
    <div className={styles.modal_wrap} style={style}>
      <div className={styles.modal}>
        <img
          className={styles.modal_deleteBtn}
          src={deleteBtn}
          onClick={onclickDeleteBtn}
          alt="삭제 버튼"
        />
        {children}
      </div>
      <div className={styles.modal_background} onClick={onclickDeleteBtn}></div>
    </div>
  );
}

export default ModalWrap;
