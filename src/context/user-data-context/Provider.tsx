import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ICategoryWiseData,
  ICategoryWiseExpensePercentage,
  IMonthlyExpense,
  UserDataContext,
} from "./context";

const UserDataProvider = () => {
  const [categoryWiseExpenseData, setCategoryWiseExpenseData] = useState<
    ICategoryWiseData[]
  >([]);
  const [categoryWiseExpensePercentage, setCategoryWiseExpensePercentage] =
    useState<ICategoryWiseExpensePercentage>(
      {} as ICategoryWiseExpensePercentage
    );

  const [monthlyExpense, setMonthlyExpense] = useState<IMonthlyExpense[]>([]);

  const updateCategoryWiseExpenseData = (value: ICategoryWiseData[]) => {
    setCategoryWiseExpenseData(value);
  };

  const updateMonthlyExpense = (value: IMonthlyExpense[]) => {
    setMonthlyExpense(value);
  };

  const updateCategoryWiseExpensePercentage = (
    value: ICategoryWiseExpensePercentage
  ) => {
    setCategoryWiseExpensePercentage(value);
  };

  return (
    <UserDataContext.Provider
      value={{
        categoryWiseExpenseData,
        updateCategoryWiseExpenseData,
        categoryWiseExpensePercentage,
        updateCategoryWiseExpensePercentage,
        updateMonthlyExpense,
        monthlyExpense,
      }}
    >
      <Outlet />
    </UserDataContext.Provider>
  );
};
export default UserDataProvider;
