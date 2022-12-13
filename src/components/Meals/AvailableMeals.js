import React, { useState, useEffect } from "react";
import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const productItems = async () => {
      const data = await fetch(
        "https://food-order-app-fed0b-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!data.ok) {
        throw new Error("There is an error in API ");
      }

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
      setIsLoading(false);

      setMeal(loadedProducts);
    };

    productItems().catch((error) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

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
    <React.Fragment>
      {isLoading && <p className={style.loading}>Loading...</p>}
      {httpError && <p className={style.error}>{httpError}</p>}
      <section className={style.meals}>
        <ul>{mealList} </ul>
      </section>
    </React.Fragment>
  );
};

export default AvailableMeals;
