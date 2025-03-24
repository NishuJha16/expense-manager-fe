const ProgressBar = ({ remainingDays, value }: any) => {
  return (
    <div className="flex bg-[#D5EDFF] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 h-[48px] rounded-xl overflow-hidden justify-between">
      <div
        className={` bg-progress-pattern bg-no-repeat bg-cover rounded-xl px-2`}
        style={{ width: `${value}%` }}
      >
        <div className="text-lg font-semibold">{Math.ceil(value)}%</div>
        <div className="text-xs">Completed</div>
      </div>
      <div className="px-2 flex flex-col justify-center">
        <div className="text-xs font-light">Remaining</div>
        <div className="text-md ">{remainingDays} Days</div>
      </div>
    </div>
  );
};
export default ProgressBar;
