import Holidays from "date-holidays";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();

export const getTotalDaysInMonth = () => {
  const totalDays = new Date(year, month + 1, 0).getDate();
  return totalDays;
};

export const getRemainingDaysInMonth = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const remainingDays = lastDayOfMonth.getDate() - today.getDate();

  return remainingDays;
};

export const getRemainingWeekendsInMonth = () => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  let remainingWeekends = 0;

  for (let day = today.getDate(); day <= lastDayOfMonth.getDate(); day++) {
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      remainingWeekends++;
    }
  }

  return remainingWeekends;
};

export const getRemainingHolidaysInMonth = () => {
  const hd = new Holidays("IN");
  const holidays = hd.getHolidays(year).filter((holiday: any) => {
    const holidayDate = new Date(holiday.date);
    const today = new Date();
    return holidayDate.getMonth() === month && holidayDate >= today;
  });

  return holidays.length;
};
