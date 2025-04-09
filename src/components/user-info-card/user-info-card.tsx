import { useEffect, useState } from "react";
import { ReactComponent as ProfileImage } from "../../assets/profileImage.svg";
import ProfileImageSmall from "../../assets/profileImage.svg";
import Card from "../card/card";
import ProgressBar from "../progress-bar/progress-bar";
import moment from "moment";
import {
  getRemainingWeekendsInMonth,
  getRemainingDaysInMonth,
  getTotalDaysInMonth,
  getRemainingHolidaysInMonth,
} from "../../utils/date-utils";
import { IUser } from "../../pages/home/home";
import AddBudgetForm from "../add-budget-form/add-bugdet-form";
import AddExpenseForm from "../add-expense-form/add-expense-form";
const UserInfoCard = ({ userInfo }: { userInfo: IUser | null }) => {
  const [currentDate] = useState<Date>(new Date());
  const [totalWeekends, setTotalWeekends] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [totalHolidays, setTotalHolidays] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [isAddBudgetModalOpen, setIsAddBudgetModalOpen] =
    useState<boolean>(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    useState<boolean>(false);

  const greeting = () => {
    const hour = moment().hour();

    if (hour > 16) {
      return "Good evening!!";
    }

    if (hour > 11) {
      return "Good afternoon!!";
    }

    return "Good morning!!";
  };

  useEffect(() => {
    setTotalWeekends(getRemainingWeekendsInMonth());
    setTotalHolidays(getRemainingHolidaysInMonth());
    setRemainingDays(getRemainingDaysInMonth());
    setTotalDays(getTotalDaysInMonth());
  }, [currentDate]);

  return (
    <Card className="rounded-2xl h-full">
      <div className="flex gap-2 pl-0 relative flex-col lg:flex-row">
        <img
          src="https://avatar.iran.liara.run/public"
          className="w-[100px] h-[100px]  hidden lg:block"
        />
        <div className="flex flex-col flex-1 pt-[90px] lg:pt-0">
          <img
            src="https://avatar.iran.liara.run/public"
            className="absolute max-h-[150px] max-w-[150px] top-[-60px] block lg:hidden left-[calc(50%-75px)]"
            onError={(error) => console.log(error)}
          />
          <div className="text-sm">{greeting()}</div>
          <div className="text-xl font-semibold">{userInfo?.name}</div>
          <div className="text-slate-400 text-xs italic pb-3">
            {moment(currentDate).format("DD MMMM, dddd")}
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <button
              className="text-sm py-2 px-3 rounded-lg font-semibold bg-[#008EE4] text-white"
              onClick={() => setIsAddExpenseModalOpen(true)}
            >
              + Add Expense
            </button>
            <button
              onClick={() => setIsAddBudgetModalOpen(true)}
              className="text-sm py-2 px-3 rounded-lg font-semibold bg-[#008EE4] text-white"
            >
              + Add Budget
            </button>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <div className="italic text-slate-700 dark:text-gray-200 text-xs">
              Month: {moment(currentDate).format("MMMM")}
            </div>
            <ProgressBar
              value={((totalDays - remainingDays) / totalDays) * 100}
              remainingDays={remainingDays}
            />
            <div className="flex flex-col gap-1">
              <div className="italic text-slate-700  dark:text-gray-200 font-medium text-xs">
                Remaining Days:
              </div>
              <div className="italic text-slate-700 dark:text-gray-200 text-xs flex gap-1 items-center">
                <div className="w-[10px] h-[10px] bg-blue-500 rounded-full"></div>
                <div>{remainingDays - totalWeekends} Weekdays</div>
              </div>
              <div className="italic text-slate-700 dark:text-gray-200 text-xs flex gap-1 items-center">
                <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
                <div>{totalWeekends + totalHolidays} Weekends and Holidays</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddBudgetModalOpen && (
        <AddBudgetForm onClose={() => setIsAddBudgetModalOpen(false)} />
      )}
      {isAddExpenseModalOpen && (
        <AddExpenseForm onClose={() => setIsAddExpenseModalOpen(false)} />
      )}
    </Card>
  );
};
export default UserInfoCard;
