import React from "react";
import Modal from "../../UI/Modal";
import style from "./AddMealsModal.module.css";

const AddMealsModal = (props) => {
  return (
    <Modal onClick={props.onClick}>
      <div className={style.actions}>
        <button className={style.button}>Send</button>
        <button className={style["button--alt"]}>Close</button>
      </div>
    </Modal>
  );
};

export default AddMealsModal;
