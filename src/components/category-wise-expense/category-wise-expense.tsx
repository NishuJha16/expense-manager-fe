import { useEffect, useMemo, useState } from "react";
import Card from "../card/card";
import LinearProgressBar from "../linear-progress-bar/linear-progress-bar";
import { getCategoryWiseExpenseBudgetService } from "../../services/budget.service";
import { toast } from "react-toastify";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import { categoryWiseExpenseMetaData } from "./constants";
import moment from "moment";

const CategoryWiseExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { categoryWiseExpenseData, updateCategoryWiseExpenseData } =
    useUserDataContextContext();

  const getCategoryWiseExpense = async () => {
    setLoading(true);
    try {
      const response = await getCategoryWiseExpenseBudgetService(
        Number(moment().format("M")),
        2025
      );
      updateCategoryWiseExpenseData(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryWiseExpense();
  }, []);

  const categoryWiseExpense = useMemo(() => {
    if (categoryWiseExpenseData) {
      return categoryWiseExpenseData?.map((data) => ({
        ...data,
        icon: categoryWiseExpenseMetaData.find(
          (value) => value.category === data.category
        )?.icon,
      }));
    }
    return categoryWiseExpenseMetaData;
  }, [categoryWiseExpenseData]);

  console.log(categoryWiseExpense);

  return (
    <div className="flex gap-3 flex-col h-full">
      <div className="text-lg font-bold ">Category wise Expenses</div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto xl:h-full">
        {categoryWiseExpense?.length ? (
          categoryWiseExpense?.map((data, index) => (
            <Card key={index}>
              <div className="flex flex-col gap-2 min-w-[80px] h-full">
                <div className="flex justify-center items-center w-[60px] h-[60px] bg-slate-300 rounded-full">
                  {data.icon}
                </div>
                <div className="text-lg">{data.category}</div>
                <div className="flex flex-col gap-1 mt-auto">
                  <div className="text-xs">{`₹${data.totalExpenses} of ₹${data.totalBudget}`}</div>
                  <LinearProgressBar
                    value={(data.totalExpenses / data.totalBudget) * 100}
                  />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex-1 justify-center items-center flex">
            No Data Available
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryWiseExpense;
