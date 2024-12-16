import styles from "./ModalWrap.module.scss";
import deleteBtn from "../../assets/icons/btn_delete.png";

function ModalWrap({ children, handleDeleteModal }) {
  const onclickDeleteBtn = () => {
    handleDeleteModal();
  };

  return (
    <div>
      <div className={styles.modal}>
        <img
          className={styles.modal_deleteBtn}
          src={deleteBtn}
          onClick={onclickDeleteBtn}
          alt="삭제 버튼"
        />
        {children}
      </div>
      <div className={styles.modal_background}></div>
    </div>
  );
}

export default ModalWrap;
