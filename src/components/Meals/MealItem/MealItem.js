import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItems({
      amount: amount,
      price: props.price,
      name: props.name,
      id: props.id,
    });
  };

  return (
    <li className={style.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
