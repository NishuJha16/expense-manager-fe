import moment from "moment";
import Card from "../card/card";
import { upcomingExpenses } from "./data";

const UpcomingExpenses = () => {
  return (
    <div className="flex gap-3 flex-col">
      <div className="text-lg font-bold">Upcoming Expenses</div>
      <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-2">
        {upcomingExpenses?.map((data, index) => (
          <Card key={index}>
            <div className="flex gap-2 items-center relative">
              <div className="flex justify-center items-center font-bold w-[40px] h-[40px] rounded-xl bg-[#D5EDFF] dark:bg-slate-500">
                {data.title[0]}
              </div>
              <div className="flex flex-col flex-1 ">
                <div className="text-[10px] absolute right-1 top-[-8px] text-right w-full text-slate-500 dark:text-gray-400 italic">
                  {moment(data.datetime).format("DD MMMM")}
                </div>
                <div className="text-xs font-semibold ">{data.title}</div>
                <div className="text-xs text-slate-700 dark:text-gray-200">
                  ₹{data.amount}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default UpcomingExpenses;
