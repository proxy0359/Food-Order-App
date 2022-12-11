import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AddMealsModal from "./components/Layout/AddItems/AddMealsModal";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [addProductsShown, setAddProductsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const addProductsHandler = () => {
    setAddProductsShown(true);
  };
  const addProductsRemove = () => {
    setAddProductsShown(false);
  };

  return (
    <CartProvider>
      {addProductsShown && <AddMealsModal onClick={addProductsRemove} />}
      {cartIsShown && <Cart modalClose={hideCartHandler} />}
      <Header cartHandler={showCartHandler} onClick={addProductsHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
