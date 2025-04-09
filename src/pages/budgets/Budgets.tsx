import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import moment from "moment";
import { getCategoryWiseExpenseBudgetService } from "../../services/budget.service";
import { MenuItem, Select, TextField } from "@mui/material";
import { monthOptions } from "../../constants/app-constants";

export interface IBudgets {
  category: string;
  totalBudget: number;
  totalExpenses: number;
}

const Budgets = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allBudgets, setAllBudgets] = useState<IBudgets[]>([]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    Number(moment().format("M"))
  );
  const [currentYear, setCurrentYear] = useState<number>(
    Number(moment().format("YYYY"))
  );

  const columns: GridColDef<(typeof allBudgets)[number]>[] = [
    {
      field: "category",
      headerName: "Category",
      maxWidth: 150,
      flex: 1,
    },
    {
      field: "totalBudget",
      headerName: "Total Budget",
      sortable: true,
      width: 160,
      cellClassName: "text-green-700 font-bold",
      valueFormatter: (val) => `₹${val}`,
    },
    {
      field: "totalExpenses",
      headerName: "Total Expense",
      sortable: true,
      width: 160,
      cellClassName: "text-red-600 font-bold",
      valueFormatter: (val) => `₹${val}`,
    },
  ];

  const getAllBudgets = async () => {
    setLoading(true);
    try {
      const response = await getCategoryWiseExpenseBudgetService(
        currentMonth,
        currentYear
      );
      setAllBudgets(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBudgets();
  }, [currentMonth, currentYear]);

  return (
    <div className="flex flex-col gap-6 max-h-full overflow-hidden flex-1">
      <div className="flex flex-col lg:flex-row gap-3 justify-between">
        <div className="text-lg font-bold">
          Budget for the Month of {moment(currentMonth, "M").format("MMMM")}
        </div>
        <div className="flex gap-1">
          <Select
            value={currentMonth}
            className="h-[40px] text-gray-700 dark:text-gray-200"
            label="month"
            onChange={(event) => setCurrentMonth(Number(event.target.value))}
          >
            {monthOptions.map((month, index) => (
              <MenuItem key={index} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="currentYear"
            type="number"
            slotProps={{
              input: {
                className: "h-[40px] text-gray-700 dark:text-gray-200",
              },
            }}
            value={currentYear}
            onChange={(event) => setCurrentYear(Number(event.target.value))}
          />
        </div>
      </div>

      <div className="h-[calc(100%-64px)]">
        <DataGrid
          rows={allBudgets}
          columns={columns}
          loading={loading}
          getRowId={(row: any) => row.category + Math.random()}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slotProps={{
            pagination: { className: "text-slate-700 dark:text-gray-200" },
            columnHeaders: { className: "text-slate-700 dark:text-gray-900" },
            cell: { className: "text-slate-700 dark:text-gray-200" },
          }}
          rowSelection={false}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        />
      </div>
    </div>
  );
};
export default Budgets;
