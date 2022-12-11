import React, { Fragment } from "react";
import style from "./Header.module.css";

import HeaderImg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import AddMeals from "./AddItems/AddMeals";

const Header = (props) => {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>React Meals</h1>
        <AddMeals onClick={props.onClick} />
        <HeaderCartButton cartHandler={props.cartHandler} />
      </header>
      <div className={style["main-image"]}>
        <img src={HeaderImg} />
      </div>
    </Fragment>
  );
};

export default Header;
