const Card = ({ children, className }: any) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 rounded-2xl p-3 flex-1 ${className}`}
    >
      {children}
    </div>
  );
};
export default Card;
