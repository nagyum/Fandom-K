import React from "react";
import credit from "../../assets/icons/credit.png";
import CustomButton from "../CustomButtom/CustomButton";
import styles from "./LackingCredit.module.scss";
import ModalWrap from "./ModalWrap";

function LackingCreditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalWrap handleDeleteModal={onClose}>
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <img className={styles.credit_Img} src={credit} alt="creditImg" />
        <p className={styles.modalMessage}>
          앗! 투표하기 위한 <span className={styles.text_color}>크레딧</span>이 부족해요
        </p>
        <CustomButton className={styles.modalButton} onClick={onClose}>확인</CustomButton>
      </div>
    </div>
    </ModalWrap>
  );
}

export default LackingCreditModal;
