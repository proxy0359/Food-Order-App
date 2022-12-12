import React, { useState } from "react";
import Modal from "../../UI/Modal";
import style from "./AddMealsModal.module.css";

const AddMealsModal = (props) => {
  const [nameVal, setNameVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [priceVal, setPriceVal] = useState();

  const nameIsValid = nameVal.trim() !== "";
  const descriptionIsValid = descriptionVal.trim() !== "";
  const priceIsVal = priceVal > 1;

  const nameOnChangeHandler = (event) => {
    setNameVal(event.target.value);
  };

  const desChangeHandler = (event) => {
    setDescriptionVal(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPriceVal(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!nameIsValid) {
      return;
    }
    if (!descriptionIsValid) {
      return;
    }
    if (!priceIsVal) {
      return;
    }

    await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameVal,
          description: descriptionVal,
          price: priceVal,
        }),
      }
    );

    setDescriptionVal("");
    setPriceVal("");

    setNameVal("");
  };
  return (
    <Modal onClick={props.onClick}>
      <form onSubmit={formSubmitHandler} className={style.input}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          onChange={nameOnChangeHandler}
          value={nameVal}
        />
        <label htmlFor="productDescription">Description</label>
        <input
          type="text"
          id="productDescription"
          onChange={desChangeHandler}
          value={descriptionVal}
        />
        <label htmlFor="productPrice">Price</label>
        <input
          type="text"
          id="productPrice"
          onChange={priceChangeHandler}
          value={priceVal}
        />

        <div className={style.actions}>
          <button className={style.button}>Send</button>
          <button className={style["button--alt"]} onClick={props.onClick}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMealsModal;
