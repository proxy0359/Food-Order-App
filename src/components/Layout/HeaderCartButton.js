import React, { useContext, useState, useEffect } from "react";
import style from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";

import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [bumpOn, setbumpOn] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbumpOn(true);

    const cleanUp = setTimeout(() => {
      setbumpOn(false);
    }, 300);
    return () => {
      clearTimeout(cleanUp);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((prevVal, value) => {
    return prevVal + value.amount;
  }, 0);

  const btnClasses = `${style.button} ${bumpOn ? style.bump : ""}`;

  return (
    <button onClick={props.cartHandler} className={btnClasses}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
