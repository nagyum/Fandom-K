import React from "react";
import credit from "../../assets/icons/credit.png";
import CustomButton from "../CustomButtom/CustomButton";
import styles from "./Modal.module.scss";

function CreditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <img src={credit} alt="creditImg" className={styles.creditImage} />
        <p className={styles.modalMessage}>
          앗 투표하기 위한 크레딧이 부족해요!
        </p>
        <CustomButton onClick={onClose}>확인</CustomButton>
      </div>
    </div>
  );
}

export default CreditModal;
