import React, { Dispatch, SetStateAction } from "react";
import { useInView } from "react-intersection-observer";
import { currentYear } from "../../../../utils/days";
import styles from "./Years.module.css";

interface IYearsProps {
  year: number;
  setIsMonthChoose: Dispatch<SetStateAction<boolean>>;
  setIsYearChoose: Dispatch<SetStateAction<boolean>>;
  onYearChange: (newYear: number) => void;
}

export const Years = ({
  year,
  setIsMonthChoose,
  setIsYearChoose,
  onYearChange,
}: IYearsProps) => {
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const setYear = (year: number) => {
    setIsMonthChoose(true);
    setIsYearChoose(false);
    onYearChange(year);
  };

  return (
    <div
      ref={ref}
      onClick={() => setYear(year)}
      className={`${styles.YearItem} ${inView ? styles.YearItemActive : ""} ${
        year === currentYear ? styles.YearItemCurrent : ""
      }`}
    >
      {year}
    </div>
  );
};
