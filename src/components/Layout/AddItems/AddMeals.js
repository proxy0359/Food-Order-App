import React from "react";
import style from "./AddMeals.module.css";

const AddMeals = (props) => {
  return (
    <button className={style.button} onClick={props.onClick}>
      + Add Product
    </button>
  );
};

export default AddMeals;
