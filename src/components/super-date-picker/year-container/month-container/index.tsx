import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { currentMonth, currentYear, shortMonthNames } from "../../../../utils/days";
import styles from "./MonthContainer.module.css";

interface IMonthContainerProps {
  year: number;
  onYearChange: (newYear: number) => void;
  setDisplayedDate: Dispatch<SetStateAction<Date>>;
  setIsMonthChoose: Dispatch<SetStateAction<boolean>>;
}

export const MonthContainer = ({
  year,
  onYearChange,
  setDisplayedDate,
  setIsMonthChoose,
}: IMonthContainerProps) => {
  const [ref, inView] = useInView({
    threshold: 0.98,
  });

  const [inactiveRef, inactiveRefinView] = useInView({
    threshold: 0.67,
  });

  useEffect(() => {
    if (inView) {
      onYearChange(year);
    }
  }, [inView]);

  return (
    <div ref={inactiveRef}>
      <div className={styles.MonthContainer} ref={ref}>
        {shortMonthNames.map((month, index) => (
          <div
            key={month}
            className={`${styles.MonthItem} ${
              !inactiveRefinView && styles.MonthItemGrey
            } ${
              currentMonth === index && year === currentYear
                ? styles.MonthItemCurrent
                : ""
            }`}
            onClick={() => {
              setDisplayedDate(new Date(year, index, 1));
              setIsMonthChoose(false);
            }}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};
