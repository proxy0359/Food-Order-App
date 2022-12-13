import React, { useRef } from "react";
import style from "./cartForm.module.css";

const CartForm = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const postalCode = useRef();
  const cityRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalCode.current.value;
    const enteredCity = cityRef.current.value;
  };
  return (
    <form onSubmit={onSubmitHandler} className={style.form}>
      <div className={style.control}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" ref={nameRef} />
      </div>
      <div className={style.control}>
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" ref={streetRef} />
      </div>
      <div className={style.control}>
        <label htmlFor="postalCode">Postal Code</label>
        <input type="text" name="postalCode" id="postalCode" ref={postalCode} />
      </div>
      <div className={style.control}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" ref={cityRef} />
      </div>
      <div className={style.actions}>
        <button type="submit" className={style.submit}>
          Confirm
        </button>
        <button type="submit" onClick={props.onClick} className={style.cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CartForm;
