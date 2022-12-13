import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Cart = (props) => {
  const [showCartForm, setShowCartForm] = useState(false);
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

  const showOrderForm = () => {
    setShowCartForm(true);
  };

  const cartActions = (
    <div className={style.actions}>
      <button onClick={props.modalClose} className={style["button--alt"]}>
        Close
      </button>
      {noItems && (
        <button className={style.button} onClick={showOrderForm}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClick={props.modalClose}>
      {mealItems}
      <div className={style.total}>
        <span>Total amount</span>
        <span>{updatedAmount}</span>
      </div>
      {showCartForm && <CartForm onClick={props.modalClose} />}
      {!showCartForm && cartActions}
    </Modal>
  );
};

export default Cart;
