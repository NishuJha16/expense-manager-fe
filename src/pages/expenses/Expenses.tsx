import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IMonthlyExpense } from "../../context/user-data-context/context";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllExpenseService } from "../../services/expense.service";

export interface IUser {
  id: number;
  name: string;
  username: string;
}

const Expenses = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [allExpenses, setAllExpenses] = useState<IMonthlyExpense[]>([]);

  const columns: GridColDef<(typeof allExpenses)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "datetime",
      headerName: "Date",
      type: "string",
      width: 200,
      valueFormatter: (val) => moment(val).format("DD/MM/YYYY hh:mm a"),
    },
    {
      field: "description",
      headerName: "Description",
      sortable: true,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      width: 160,
      valueFormatter: (val) => `₹${val}`,
    },
    {
      field: "mode",
      headerName: "Mode",
      sortable: true,
      width: 160,
    },
  ];

  const getAllExpense = async () => {
    setLoading(true);
    try {
      const response = await getAllExpenseService();
      setAllExpenses(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllExpense();
  }, []);

  return (
    <div className="flex flex-col gap-6 max-h-full overflow-hidden flex-1">
      <div className="text-lg font-bold">All Expenses</div>
      <div className="h-[calc(100%-64px)]">
        <DataGrid
          rows={allExpenses}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          slotProps={{
            pagination: { className: "text-slate-700 dark:text-gray-200" },
            columnHeaders: { className: "text-slate-700 dark:text-gray-900" },
            cell: { className: "text-slate-700 dark:text-gray-200" },
          }}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
          rowSelection={false}
        />
      </div>
    </div>
  );
};
export default Expenses;
