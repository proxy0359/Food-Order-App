import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReduceR = (state, action) => {
  if (action.type === "ADD") {
    const UpdatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // --------return The index of array if the condition is true ------------
    const existingItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updateExistingItem = state.items[existingItem];

    let updatedItems;

    if (updateExistingItem) {
      const updatedItem = {
        ...updateExistingItem,
        amount: updateExistingItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: UpdatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const checkRemove = state.items.findIndex(
      (items) => items.id === action.id
    );
    const checkItemRemove = state.items[checkRemove];
    const updatedAmountTotal = state.totalAmount - checkItemRemove.price;
    let updatedItems;
    if (checkItemRemove.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...checkItemRemove,
        amount: checkItemRemove.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[checkRemove] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmountTotal,
    };
  }
  return defaultCartState;
};

// -------------- Component --------------------
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReduceR,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,

    addItems: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
