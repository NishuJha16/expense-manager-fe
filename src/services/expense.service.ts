import axiosInstance from "./interceptor";

export const addCategoryWiseExpense = async (addBudgetData: any) => {
  const response = await axiosInstance.post(`expenses`, addBudgetData);
  return response?.data;
};

export const getMonthlyExpenseService = async (month: number, year: number) => {
  const response = await axiosInstance.get(`expenses/monthly/${month}/${year}`);
  return response?.data;
};

export const getAllExpenseService = async () => {
  const response = await axiosInstance.get(`expenses`);
  return response?.data;
};
