import { useEffect, useState } from "react";
import BudgetExpenseGraph from "../../components/budget-expense-graph/budget-expense-graph";
import CategoryWiseExpense from "../../components/category-wise-expense/category-wise-expense";
import ExpenseDistribution from "../../components/expense-distribution/expense-distribution";
import RecentTransactions from "../../components/recent-transactions/recent-transactions";
import UpcomingExpenses from "../../components/upcoming-expenses/upcoming-expenses";
import UserInfoCard from "../../components/user-info-card/user-info-card";
import { userInfoService } from "../../services/user.service";
import { useUserDataContextContext } from "../../context/user-data-context/context";

export interface IUser {
  id: number;
  name: string;
  username: string;
}

const Home = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const { categoryWiseExpenseData } = useUserDataContextContext();
  const getUserInfo = async () => {
    try {
      const data = await userInfoService();
      setUserInfo(data);
    } catch (error) {
      console.log("error fetching user data");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col gap-6 pb-4 flex-1 ">
      <div className="flex gap-4 pl-0 flex-1 lg:flex-none flex-col lg:flex-row">
        <div className="flex-none lg:flex-1 rounded-2xl lg:rounded-l-full">
          <UserInfoCard userInfo={userInfo} />
        </div>
        <div className="flex-[1.5] flex gap-4 flex-col lg:flex-row">
          {categoryWiseExpenseData && (
            <BudgetExpenseGraph
              expense={categoryWiseExpenseData.reduce(
                (sum, item) => sum + item.totalExpenses,
                0
              )}
              budget={categoryWiseExpenseData.reduce(
                (sum, item) => sum + item.totalBudget,
                0
              )}
            />
          )}
          <ExpenseDistribution />
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-[2]">
          <CategoryWiseExpense />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <UpcomingExpenses />
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};
export default Home;
