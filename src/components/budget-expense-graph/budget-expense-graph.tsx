import Card from "../card/card";
import { ReactComponent as Spinner } from "../../assets/bouncing-circles.svg";
import moment from "moment";

const BudgetExpenseGraph = ({ expense, budget }: any) => {
  const percentage = (expense / budget) * 100;
  return (
    <Card className="overflow-hidden flex-1">
      <div className="flex flex-col h-full min-h-[200px] lg:min-h-0">
        <div className="text-lg font-bold ">Budget vs Expense</div>
        <div className="text-slate-400 text-xs italic">
          From 1st - {moment().format("Do MMMM YYYY")}
        </div>
        {isNaN(percentage) ? (
          <div className="flex flex-1 justify-center items-center">
            <Spinner width={100} height={100} />
          </div>
        ) : (
          <div className="flex-1 flex justify-center relative overflow-hidden">
            {percentage ? (
              <div className="absolute ">
                <svg
                  className="size-full rotate-180"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-[#D5EDFF]"
                    strokeWidth="1.5"
                    strokeDasharray="50 100"
                    strokeLinecap="round"
                  ></circle>

                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current"
                    style={{ color: percentage > 50 ? "red" : "green" }}
                    strokeWidth="1.5"
                    strokeDasharray={`${
                      (50 * (percentage <= 100 ? percentage : 100)) / 100
                    } 100`}
                    strokeLinecap="round"
                  ></circle>
                </svg>

                <div className="absolute top-[25%] start-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-2xl font-bold text-slate-700 dark:text-gray-200">
                    {percentage <= 100
                      ? `${Math.ceil(percentage)}%`
                      : "Overspent"}
                    <span className="text-sm font-normal"> spent</span>
                  </div>
                  <div className="text-md whitespace-nowrap text-slate-600 dark:text-gray-300">
                    ₹{parseInt(expense)} &nbsp;of&nbsp; ₹{budget}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 justify-center items-center flex">
                No Data Available
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
export default BudgetExpenseGraph;
