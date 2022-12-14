import React, { useRef, useState } from "react";
import style from "./cartForm.module.css";

const nameIsValid = (name) => name !== "";
const streetIsValid = (street) => street !== "";
const cityIsValid = (city) => city !== "";
const postalIsValid = (postal) => postal === 5;

const CartForm = (props) => {
  const [validInput, setValidInput] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
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

    const validName = nameIsValid(enteredName);
    const validStreet = streetIsValid(enteredStreet);
    const validPostal = postalIsValid(enteredPostal);
    const validCity = cityIsValid(enteredCity);

    const formIsValid = validName && validStreet && validPostal && validCity;

    setError({
      name: validName,
      street: validStreet,
      postal: validPostal,
      city: validCity,
    });

    if (formIsValid) {
      return;
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className={style.form}>
      <div className={style.control}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" ref={nameRef} />
        {!error.name && <p>Please a valid Name!</p>}
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
