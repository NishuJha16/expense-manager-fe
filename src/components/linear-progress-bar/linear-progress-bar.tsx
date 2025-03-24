const LinearProgressBar = ({ value }: any) => {
  return (
    <div className="flex bg-[#D5EDFF] h-[8px] rounded-xl overflow-hidden">
      <div
        className={` bg-[#008EE4] rounded-xl px-2`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};
export default LinearProgressBar;
