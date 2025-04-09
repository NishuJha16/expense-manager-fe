import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryWiseExpenseMetaData } from "../category-wise-expense/constants";
import Modal from "../modal/modal";
import { toast } from "react-toastify";
import {
  addCategoryWiseExpense,
  getMonthlyExpenseService,
} from "../../services/expense.service";
import {
  getCategoryWiseExpenseBudgetService,
  getCategoryWiseExpensePercentageService,
} from "../../services/budget.service";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import moment from "moment";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

type CreateExpenseFormData = {
  datetime: string;
  category: string;
  title: string;
  description: string;
  amount: number;
  mode: string;
  recurrencePattern: string | null;
  isRecurring?: boolean;
};

const paymentModes = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "UPI",
];

const AddExpenseForm = ({ onClose }: { onClose: Function }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseFormData>();
  const {
    updateCategoryWiseExpenseData,
    updateCategoryWiseExpensePercentage,
    updateMonthlyExpense,
  } = useUserDataContextContext();

  const categories = useMemo(
    () => categoryWiseExpenseMetaData.map((data) => data.category),
    []
  );

  const onSubmit = async (data: CreateExpenseFormData) => {
    setLoading(true);
    try {
      await addCategoryWiseExpense({
        ...data,
        isRecurring: !!data.recurrencePattern,
      });
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
      const recentTransactionResponse = await getMonthlyExpenseService(
        month,
        year
      );
      updateMonthlyExpense(recentTransactionResponse);
      updateCategoryWiseExpensePercentage(percentageResponse);
      updateCategoryWiseExpenseData(categoryDataResponse);
      toast(`Expense added successfully for ${data.category} category`, {
        type: "success",
      });
    } catch (data) {
      toast("Cannot add Expense.. Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title="Add Expense">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 rounded-md space-y-4"
      >
        {/* Datetime Field */}
        <div>
          <label
            htmlFor="datetime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Date and Time
          </label>
          <input
            id="datetime"
            type="datetime-local"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("datetime", { required: true })}
          />
          {errors.datetime && (
            <p className="text-red-500 text-xs mt-1">
              Date and time are required
            </p>
          )}
        </div>

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
            <option value="">Select a category</option>
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

        {/* Title Field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">Title is required</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("description")}
          />
        </div>

        {/* Amount Field */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("amount", { required: true, min: 0.01 })}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">
              Amount is required and should be greater than 0
            </p>
          )}
        </div>

        {/* Mode Dropdown */}
        <div>
          <label
            htmlFor="mode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Payment Mode
          </label>
          <select
            id="mode"
            className="mt-1 block w-full p-2 border border-gray-300 bg-white dark:bg-slate-500 dark:border-gray-700  rounded-md shadow-sm focus:outline-none focus:ring-[#008EE4] focus:border-[#008EE4]"
            {...register("mode", { required: true })}
          >
            <option value="">Select a mode</option>
            {paymentModes.map((mode, index) => (
              <option key={index} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {errors.mode && (
            <p className="text-red-500 text-xs mt-1">
              Mode of payment is required
            </p>
          )}
        </div>

        {/* Recurrence Pattern */}
        <div className="mt-4">
          <label
            htmlFor="recurrencePattern"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Recurrence Pattern
          </label>
          <div className="flex gap-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="daily"
                {...register("recurrencePattern")}
                className="form-radio text-[#008EE4]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">
                Daily
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="weekly"
                {...register("recurrencePattern")}
                className="form-radio text-[#008EE4]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">
                Weekly
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="monthly"
                {...register("recurrencePattern")}
                className="form-radio text-[#008EE4]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">
                Monthly
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="yearly"
                {...register("recurrencePattern")}
                className="form-radio text-[#008EE4]"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-200">
                Yearly
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            style={{ opacity: loading ? 0.5 : 1 }}
            disabled={loading}
            className="w-full justify-center items-center flex gap-1 bg-[#008EE4] text-white py-2 px-4 rounded-md hover:bg-[#0071B3] focus:outline-none focus:ring-2 focus:ring-[#008EE4] cursor-pointer"
          >
            {loading && <Spinner width={20} height={20} />}
            {loading ? "Adding data..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpenseForm;
