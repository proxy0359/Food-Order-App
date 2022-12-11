import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
import { Fragment } from "react";
const meals = (props) => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals inputVal={props.inputVal} />
    </Fragment>
  );
};

export default meals;
