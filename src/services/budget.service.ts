import axiosInstance from "./interceptor";

export const getCategoryWiseExpenseBudgetService = async (
  month: number,
  year: number
) => {
  const response = await axiosInstance.get(
    `budgets/category-wise/${month}/${year}`
  );
  return response?.data;
};

export const addCategoryWiseBudget = async (addBudgetData: any) => {
  const response = await axiosInstance.post(`budgets/add`, addBudgetData);
  return response?.data;
};

export const getCategoryWiseExpensePercentageService = async (
  month: number,
  year: number
) => {
  const response = await axiosInstance.get(
    `budgets/category-wise-expense-percentage/${month}/${year}`
  );
  return response?.data;
};
