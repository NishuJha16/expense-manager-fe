import { createContext, useContext } from "react";

export interface ICategoryWiseData {
  category: string;
  totalExpenses: number;
  totalBudget: number;
}

export interface ICategoryWiseExpensePercentage {
  totalOverallExpense: number;
  categoryWiseExpensePercentage: {
    category: string;
    totalExpenses: number;
    percentage: number;
  }[];
}

export interface IMonthlyExpense {
  id: number;
  datetime: string | Date;
  category: string;
  title: string;
  description: string;
  amount: number;
  mode: string;
  month: number;
  year: number;
  timeUntilNext?: string;
}

interface IUserDataContext {
  categoryWiseExpenseData: ICategoryWiseData[];
  categoryWiseExpensePercentage: ICategoryWiseExpensePercentage;
  monthlyExpense: IMonthlyExpense[];
  updateCategoryWiseExpenseData: (data: ICategoryWiseData[]) => void;
  updateCategoryWiseExpensePercentage: (
    data: ICategoryWiseExpensePercentage
  ) => void;
  updateMonthlyExpense: (data: IMonthlyExpense[]) => void;
  upcomingExpenses: IMonthlyExpense[];
  updateUpcomingExpenses: (data: IMonthlyExpense[]) => void;
}

export const UserDataContext = createContext<IUserDataContext>(null!);

export const useUserDataContextContext = () => useContext(UserDataContext);
