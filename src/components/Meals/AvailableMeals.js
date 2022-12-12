import React, { useState, useEffect } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeal] = useState([]);

  useEffect(() => {
    const productItems = async () => {
      const data = await fetch(
        "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      const convertData = await data.json();

      let loadedProducts = [];

      for (let i in convertData) {
        const price = convertData[i].price;
        const updatedPr = parseFloat(price);
        loadedProducts.unshift({
          name: convertData[i].name,
          id: i,
          description: convertData[i].description,
          price: updatedPr,
        });
      }

      setMeal(loadedProducts);
    };

    productItems();
  }, [setMeal, meals]);

  const mealList = meals.map((meals) => (
    <Card>
      <MealItem
        inputVal={props.inputVal}
        key={meals.id}
        id={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
      />
    </Card>
  ));

  return (
    <section className={style.meals}>
      <ul>{mealList} </ul>
    </section>
  );
};

export default AvailableMeals;
