import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";

const Cart = (props) => {
  const [showCartForm, setShowCartForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const onConfirmHandler = async (userInfo) => {
    setIsSubmitting(true);
    setIsSubmitted(false);
    await fetch(
      "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/user.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userInfo, product: cartCtx.items }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clear();
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

  const loadedItems = (
    <React.Fragment>
      {mealItems}
      <div className={style.total}>
        <span>Total amount</span>
        <span>{updatedAmount}</span>
      </div>
      {showCartForm && (
        <CartForm userForm={onConfirmHandler} onClick={props.modalClose} />
      )}
      {!showCartForm && cartActions}
    </React.Fragment>
  );

  const submitting = (
    <React.Fragment>
      <p>Your form is being process...</p>
    </React.Fragment>
  );

  const doneSubmitted = <p>Your order is Successfully submitted.</p>;

  return (
    <Modal onClick={props.modalClose}>
      {isSubmitting && submitting} {isSubmitted && doneSubmitted}
      {!isSubmitting && !isSubmitted && loadedItems}
    </Modal>
  );
};

export default Cart;
