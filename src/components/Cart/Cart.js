import React, { useContext } from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const updatedAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const noItems = cartCtx.items.length > 0;

  const addItemHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const mealItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((items) => (
        <li>
          <CartItem
            key={items.id}
            price={items.price}
            name={items.name}
            amount={items.amount}
            onRemove={removeItemHandler.bind(null, items.id)}
            onAdd={addItemHandler.bind(null, items)}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.modalClose}>
      {mealItems}
      <div className={style.total}>
        <span>Total amount</span>
        <span>{updatedAmount}</span>
      </div>
      <div className={style.actions}>
        <button onClick={props.modalClose} className={style["button--alt"]}>
          Close
        </button>
        {noItems && <button className={style.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
