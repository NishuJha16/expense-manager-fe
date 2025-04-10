import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import { getUpcomingExpenseService } from "../../services/expense.service";
import Card from "../card/card";
import { ReactComponent as Spinner } from "../../assets/bouncing-circles.svg";
import { ReactComponent as NoData } from "../../assets/no-data-1.svg";

const UpcomingExpenses = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { upcomingExpenses, updateUpcomingExpenses } =
    useUserDataContextContext();

  const getUpcomingExpenses = async () => {
    setLoading(true);
    try {
      const response = await getUpcomingExpenseService();
      updateUpcomingExpenses(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUpcomingExpenses();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <div className="text-lg font-bold">Upcoming Expenses</div>
      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner width={100} height={100} />
        </div>
      ) : !!upcomingExpenses?.length ? (
        <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-2">
          {upcomingExpenses?.map((data, index) => (
            <Card key={index} className="flex flex-col gap-2">
              <div className="text-[10px] flex justify-between  text-right w-full text-slate-500 dark:text-gray-400">
                <div className="font-bold text-red-400">
                  {data.timeUntilNext?.toUpperCase()}
                </div>
                <div className="italic">
                  {moment(data.datetime).format("DD MMMM")}
                </div>
              </div>
              <div className="flex gap-2 items-center relative">
                <div className="flex justify-center items-center font-bold w-[40px] h-[40px] rounded-xl bg-[#D5EDFF] dark:bg-slate-500">
                  {data.title[0]}
                </div>
                <div className="flex flex-col flex-1 ">
                  <div className="text-xs font-semibold ">{data.title}</div>
                  <div className="text-xs text-slate-700 dark:text-gray-200">
                    ₹{data.amount}
                  </div>
                </div>
              </div>
            </Card>
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
export default UpcomingExpenses;
