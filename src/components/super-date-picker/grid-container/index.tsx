import React from "react";
import styles from "./GridContainer.module.css";
import {
  displayedShortDaysOfWeek,
  getDaysInMonth,
  getFirstDayOfMonth,
  currentMonth,
  currentYear,
} from "../../../utils/days";
import { ClickableDays } from "./clickable-days";

interface IGridContainer {
  displayedMonth: number;
  displayedYear: number;
}

export const GridContainer = ({
  displayedMonth,
  displayedYear,
}: IGridContainer) => {
  const daysInPreviousMonth = getDaysInMonth(displayedYear, displayedMonth - 1);
  const daysInDisplayedMonth = getDaysInMonth(displayedYear, displayedMonth);

  const firstDayOfWeek = getFirstDayOfMonth(displayedYear, displayedMonth);

  // Количество дней для отображения из предыдущего месяца
  const daysFromPreviousMonth = firstDayOfWeek - 1;

  // Получаем последние дни предыдущего месяца
  const startOtherDays = daysInPreviousMonth.splice(
    daysInPreviousMonth.length - daysFromPreviousMonth,
    daysFromPreviousMonth
  );

  const isCurrentMonth = currentMonth === displayedMonth;
  const isCurrentYear = currentYear === displayedYear;

  const endOtherDays = Array.from(
    { length: 42 - daysInDisplayedMonth.length - startOtherDays.length },
    (_, index) => index + 1
  );

  return (
    <div className={styles.GridContainer}>
      {displayedShortDaysOfWeek.map((day) => (
        <div key={day} className={styles.GridItem}>
          {day}
        </div>
      ))}
      {startOtherDays &&
        startOtherDays.map((day) => (
          <div
            key={day}
            className={`${styles.GridItem} ${styles.GridItemGrey}`}
          >
            {day}
          </div>
        ))}
      {daysInDisplayedMonth.map((day) => (
        <ClickableDays
          key={day}
          isCurrentMonth={isCurrentMonth}
          isCurrentYear={isCurrentYear}
          index={day}
          day={day}
          displayedMonth={displayedMonth}
          displayedYear={displayedYear}
        />
      ))}
      {endOtherDays &&
        endOtherDays.map((day) => (
          <div
            key={day}
            className={`${styles.GridItem} ${styles.GridItemGrey}`}
          >
            {day}
          </div>
        ))}
    </div>
  );
};
