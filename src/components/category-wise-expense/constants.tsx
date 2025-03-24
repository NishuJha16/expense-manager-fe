import { ReactComponent as Food } from "../../assets/food.svg";
import { ReactComponent as Healthcare } from "../../assets/healthcare.svg";
import { ReactComponent as Education } from "../../assets/education.svg";
import { ReactComponent as Other } from "../../assets/other.svg";
import { ReactComponent as Investment } from "../../assets/investment.svg";
import { ReactComponent as Personal } from "../../assets/personal.svg";
import { ReactComponent as Transport } from "../../assets/transport.svg";
import { ReactComponent as BillsUtilities } from "../../assets/bills-utilities.svg";

export const categoryWiseExpenseMetaData = [
  {
    category: "Food",
    totalExpenses: 0,
    totalBudget: 0,
    icon: <Food className="w-[48px] h-[48px]" />,
  },
  {
    category: "Healthcare",
    totalExpenses: 0,
    totalBudget: 0,
    icon: <Healthcare className="w-[48px] h-[48px]" />,
  },
  {
    category: "Bills & Utilities",
    totalExpenses: 0,
    totalBudget: 4000,
    icon: <BillsUtilities className="w-[48px] h-[48px]" />,
  },
  {
    category: "Personal",
    totalExpenses: 0,
    totalBudget: 2000,
    icon: <Personal className="w-[48px] h-[48px]" />,
  },
  {
    category: "Education",
    totalExpenses: 0,
    totalBudget: 6000,
    icon: <Education className="w-[48px] h-[48px]" />,
  },
  {
    category: "Transport",
    totalExpenses: 0,
    totalBudget: 1500,
    icon: <Transport className="w-[48px] h-[48px]" />,
  },
  {
    category: "Investment",
    totalExpenses: 0,
    totalBudget: 2000,
    icon: <Investment className="w-[48px] h-[48px]" />,
  },
  {
    category: "Others",
    totalExpenses: 0,
    totalBudget: 4000,
    icon: <Other className="w-[48px] h-[48px]" />,
  },
];
