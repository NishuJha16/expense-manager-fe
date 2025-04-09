import { useForm } from "react-hook-form";
import Modal from "../modal/modal";
import { categoryWiseExpenseMetaData } from "../category-wise-expense/constants";
import { useMemo, useState } from "react";
import {
  addCategoryWiseBudget,
  getCategoryWiseExpenseBudgetService,
  getCategoryWiseExpensePercentageService,
} from "../../services/budget.service";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import { toast } from "react-toastify";
import { monthOptions } from "../../constants/app-constants";
import moment from "moment";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

type CreateBudgetFormData = {
  category: string;
  amount: number;
  month: number;
  year: number;
};

const AddBudgetForm = ({ onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBudgetFormData>();
  const [loading, setLoading] = useState<boolean>(false);
  const { updateCategoryWiseExpenseData, updateCategoryWiseExpensePercentage } =
    useUserDataContextContext();

  const onSubmit = async (data: CreateBudgetFormData) => {
    setLoading(true);
    try {
      await addCategoryWiseBudget(data);
      const month = Number(moment().format("M"));
      const year = Number(moment().format("YYYY"));
      const categoryDataResponse = await getCategoryWiseExpenseBudgetService(
        month,
        year
      );
      const percentageResponse = await getCategoryWiseExpensePercentageService(
        month,
        year
      );
      updateCategoryWiseExpensePercentage(percentageResponse);
      updateCategoryWiseExpenseData(categoryDataResponse);
      updateCategoryWiseExpenseData(categoryDataResponse);
      toast(`Budget added successfully for ${data.category} category`, {
        type: "success",
      });
    } catch (data) {
      toast("Cannot add budget.. Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const categories = useMemo(
    () => categoryWiseExpenseMetaData.map((data) => data.category),
    []
  );

  return (
    <Modal onClose={onClose} title="Add Budget">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 bg-white dark:bg-slate-800 rounded-md space-y-4"
      >
        {/* Category Dropdown */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("category", { required: true })}
          >
            <option className="text-sm" value="">
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">Category is required</p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700  dark:text-gray-200"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-slate-500 dark:border-gray-700 focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("amount", { required: true, min: 1 })}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">
              Amount is required and should be greater than 0
            </p>
          )}
        </div>

        {/* Month Field */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Month
          </label>
          <select
            id="month"
            className="mt-1 block w-full p-2 border bg-white dark:bg-slate-500 dark:border-gray-700  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("month", { required: true })}
          >
            <option className="text-sm" value="">
              Select Month
            </option>
            {monthOptions.map((month, index) => (
              <option key={index} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          {errors.month && (
            <p className="text-red-500 text-xs mt-1">
              Month is required and should be between 1 and 12
            </p>
          )}
        </div>

        {/* Year Field */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Year
          </label>
          <input
            id="year"
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("year", { required: true, min: 1900 })}
          />
          {errors.year && (
            <p className="text-red-500 text-xs mt-1">
              Year is required and should be a valid year
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            style={{ opacity: loading ? 0.5 : 1 }}
            disabled={loading}
            className="w-full justify-center items-center flex bg-[#008EE4] text-white py-2 px-4 rounded-md hover:[#008EE4] focus:outline-none focus:ring-2 focus:ring-[#008EE4]"
          >
            {loading && <Spinner width={20} height={20} />}
            {loading ? "Adding data..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AddBudgetForm;
