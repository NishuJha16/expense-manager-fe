import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { getMonthlyExpenseService } from "../../services/expense.service";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import { toast } from "react-toastify";
import { ReactComponent as Spinner } from "../../assets/bouncing-circles.svg";
import { ReactComponent as NoData } from "../../assets/no-data-2.svg";

const RecentTransactions = ({
  showAllResults,
}: {
  showAllResults?: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { monthlyExpense, updateMonthlyExpense } = useUserDataContextContext();

  const getMonthlyExpense = async () => {
    setLoading(true);
    try {
      const month = Number(moment().format("M"));
      const year = Number(moment().format("YYYY"));
      const response = await getMonthlyExpenseService(month, year);
      updateMonthlyExpense(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMonthlyExpense();
  }, []);

  const updatedRecentTransactions = useMemo(
    () =>
      showAllResults
        ? monthlyExpense
        : monthlyExpense?.length > 3
        ? monthlyExpense?.slice(
            monthlyExpense?.length - 3,
            monthlyExpense?.length
          )
        : monthlyExpense,
    [monthlyExpense, showAllResults]
  );

  return (
    <div className="flex gap-3 flex-col w-full">
      <div className="text-lg font-bold">Recent Transactions</div>
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner width={70} height={70} />
        </div>
      ) : !!updatedRecentTransactions?.length ? (
        <div className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
          {updatedRecentTransactions?.map((data, index) => (
            <div
              className={`flex w-full items-center p-2 ${
                index % 2 == 0
                  ? "bg-white dark:bg-slate-800"
                  : "bg-slate-100 dark:bg-slate-700"
              }`}
              key={index}
            >
              <div className="text-xs flex-1 text-slate-500 dark:text-slate-100">
                {moment(data.datetime).format(
                  showAllResults ? "DD MMM YYYY, hh:mm A" : "DD MMM"
                )}
              </div>
              <div className="flex-[3] flex flex-col">
                <div className="text-sm font-medium">{data.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  {data.category}
                </div>
              </div>
              {showAllResults && (
                <div className="text-xs flex-[2] justify-start">
                  {data.description ?? "-"}
                </div>
              )}
              <div className="text-sm flex-1">₹{data.amount}</div>
              <div className="flex flex-1 justify-center">
                <div className="bg-blue-100 dark:bg-blue-900 text-[12px] font-semibold rounded-md p-1">
                  {data.mode}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 justify-center flex-col items-center flex">
          <NoData width={100} height={100} />
          No Data Available
        </div>
      )}
    </div>
  );
};
export default RecentTransactions;
