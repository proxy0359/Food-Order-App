import React, { useState, useRef } from "react";
import style from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [inputIsValid, setInputIsValid] = useState(true);
  const inputRef = useRef();

  const itemFormHandler = (event) => {
    event.preventDefault();
    const amountInput = inputRef.current.value;
    const amountInputNumber = +amountInput;
    if (
      amountInputNumber === 0 ||
      amountInputNumber > 5 ||
      amountInputNumber < 1
    ) {
      setInputIsValid(false);
      return;
    }

    props.onAddToCart(amountInputNumber);
  };
  return (
    <form onSubmit={itemFormHandler} className={style.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!inputIsValid && <p>Please enter A valid Input (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
