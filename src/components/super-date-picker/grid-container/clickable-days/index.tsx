import React from "react";
import styles from "./ClickableDays.module.css";
import { currentDate } from "../../../../utils/days";
import { useDateContext } from "../../../../hooks/dateContext";

interface IClickableDays {
  isCurrentMonth: boolean;
  isCurrentYear: boolean;
  index: number;
  day: number;
  displayedMonth: number;
  displayedYear: number;
}

export const ClickableDays = ({
  isCurrentMonth,
  isCurrentYear,
  index,
  day,
  displayedMonth,
  displayedYear,
}: IClickableDays) => {
  const {
    choosenDate,
    choosenRangeStartDate,
    choosenRangeEndDate,
    selectedIndex,
    setChoosenDate,
    setChoosenRangeStartDate,
    setChoosenRangeEndDate,
    setSelectedIndex,
  } = useDateContext();
  const dateToContext = new Date(displayedYear, displayedMonth, index);

  const handleClick = () => {
    setSelectedIndex(index);
    if (choosenDate === null) {
      setChoosenDate(dateToContext);
      setChoosenRangeStartDate(dateToContext);
    } else if (
      !choosenRangeEndDate &&
      choosenRangeStartDate &&
      choosenRangeStartDate > dateToContext
    ) {
      setChoosenRangeEndDate(choosenRangeStartDate);
      setChoosenRangeStartDate(dateToContext);
    } else if (choosenRangeStartDate && choosenRangeStartDate < dateToContext) {
      setChoosenRangeEndDate(dateToContext);
    } else {
      setChoosenRangeStartDate(dateToContext);
    }
  };

  return (
    <div
      className={`${styles.ClickableDays} ${
        currentDate.getDate() === day && isCurrentMonth && isCurrentYear
          ? styles.ClickableDaysCurrDay
          : ""
      } ${selectedIndex === index ? styles.ClickableDaysClickedDay : ""}`}
      onClick={handleClick}
    >
      {day}
    </div>
  );
};
