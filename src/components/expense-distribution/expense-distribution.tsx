import { Doughnut } from "react-chartjs-2";
import Card from "../card/card";
import { ArcElement, Chart, Legend, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { useUserDataContextContext } from "../../context/user-data-context/context";
import { getCategoryWiseExpensePercentageService } from "../../services/budget.service";
import { toast } from "react-toastify";
import moment from "moment";
import { ReactComponent as Spinner } from "../../assets/bouncing-circles.svg";

Chart.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);
Chart.defaults.plugins.tooltip.backgroundColor = "rgb(0, 0, 156)";
Chart.defaults.plugins.legend.position = "left";
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.display = false;

const ExpenseDistribution = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets:
      | {
          data: number[];
          backgroundColor: string[];
          hoverOffset: number;
        }[];
  } | null>(null);

  const {
    categoryWiseExpensePercentage: percentage,
    updateCategoryWiseExpensePercentage,
  } = useUserDataContextContext();

  const getCategoryWiseExpensePercentage = async () => {
    setLoading(true);
    try {
      const month = Number(moment().format("M"));
      const year = Number(moment().format("YYYY"));
      const response = await getCategoryWiseExpensePercentageService(
        month,
        year
      );
      updateCategoryWiseExpensePercentage(response);
    } catch (data) {
      toast("Something went wrong", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryWiseExpensePercentage();
  }, []);

  useEffect(() => {
    if (percentage?.categoryWiseExpensePercentage) {
      const localData = {
        labels: percentage?.categoryWiseExpensePercentage?.map(
          (item) => item.category
        ),
        datasets: [
          {
            data: percentage?.categoryWiseExpensePercentage
              .map((item) => parseInt(item.percentage.toString()))
              .filter((val) => val),
            backgroundColor: [
              "rgb(255, 99, 132)", // Bills & Utilities
              "rgb(54, 162, 235)", // Food
              "rgb(255, 205, 86)", // Personal
              "rgb(75, 192, 192)", // Healthcare
              "rgb(153, 102, 255)", // Education
              "rgb(255, 159, 64)", // Transport
              "rgb(201, 203, 207)", // Investment
              "rgb(100, 181, 246)", // Other
            ],
            hoverOffset: 4,
          },
        ],
      };
      setChartData(localData);
    }
  }, [percentage]);
  labels: return (
    <Card className="flex-1 max-w-[350px]">
      <div className="flex flex-col h-full">
        <div className="text-lg font-bold ">Expense Distribution</div>
        <div className="text-slate-400 text-xs italic">
          From 1st - {moment().format("Do MMMM YYYY")}
        </div>
        {loading ? (
          <div className="flex flex-1 justify-center items-center">
            <Spinner width={100} height={100} />
          </div>
        ) : (
          <div className="max-h-[200px] flex justify-between flex-1">
            <div className="flex flex-col gap-[2px] justify-center">
              {chartData?.labels.map((data, index) => (
                <div
                  className="text-slate-700 dark:text-gray-200 text-xs flex gap-1 items-center"
                  key={index}
                >
                  <div
                    className={`w-[10px] h-[10px] rounded-full`}
                    style={{
                      background: chartData?.datasets[0].backgroundColor[index],
                    }}
                  ></div>
                  <div>{data}</div>
                </div>
              ))}
            </div>
            {chartData?.datasets[0]?.data?.length ? (
              <Doughnut
                data={chartData}
                options={{
                  cutout: 50,
                  plugins: {
                    datalabels: {
                      anchor: "center",
                      color: "#000",
                      formatter: (value: number) => `${value}%`,
                    },
                  },
                }}
              />
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
export default ExpenseDistribution;
