import React from "react";
import style from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={style.summary}>
      <h2>Delicious Food, Deliver To You</h2>
      <p>
        Choose your favorite meal from our broad selection of avalable meals and
        enjoy a delicious lunch or dinner at home
      </p>
      <p>
        All our meals are cooked with high-quality ingeredients, just-in-time
        and of course by expirienced chefs!
      </p>
    </section>
  );
};
export default MealsSummary;
