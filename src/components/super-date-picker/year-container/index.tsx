import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./YearContainer.module.css";
import { MonthContainer } from "./month-container";
import { currentYear } from "../../../utils/days";
import { IYearContainerRef } from "../../../types";
import {
  firstDisplayedYear,
  halfTotalYears,
  scrolledBlockHeight,
  totalYears,
} from "../../../utils/constants";

interface IYearContainerProps {
  displayedYear: number;
  onYearChange: (newYear: number) => void;
  setDisplayedDate: Dispatch<SetStateAction<Date>>;
  setIsMonthChoose: Dispatch<SetStateAction<boolean>>;
}

export const YearContainer = forwardRef<
  IYearContainerRef | null,
  IYearContainerProps
>(
  (
    { displayedYear, onYearChange, setDisplayedDate, setIsMonthChoose },
    ref
  ) => {
    const yearContainerRef = useRef<HTMLDivElement | null>(null);
    const initialScrollTopRef = useRef<boolean>(false);

    const scrollDown = (pixels: number) => {
      if (yearContainerRef.current) {
        yearContainerRef.current.scrollTop += pixels;
      }
    };
    const scrollUp = (pixels: number) => {
      if (yearContainerRef.current) {
        yearContainerRef.current.scrollTop -= pixels;
      }
    };

    // Передача функции прокрутки наружу через ref
    useImperativeHandle(ref, () => ({
      scrollDown,
      scrollUp,
    }));

    useEffect(() => {
      if (yearContainerRef.current && !initialScrollTopRef.current) {
        const currentIndex = displayedYear - firstDisplayedYear;
        const targetScrollTop = currentIndex * scrolledBlockHeight;
        yearContainerRef.current.scrollTop = targetScrollTop;
        initialScrollTopRef.current = true;
      }
    }, [initialScrollTopRef, yearContainerRef, displayedYear]);

    return (
      <div ref={yearContainerRef} className={styles.YearContainer}>
        {Array.from(
          { length: totalYears },
          (_, i) => currentYear - halfTotalYears + i
        ).map((year, index) => (
          <MonthContainer
            key={index}
            year={year}
            onYearChange={onYearChange}
            setDisplayedDate={setDisplayedDate}
            setIsMonthChoose={setIsMonthChoose}
          />
        ))}
      </div>
    );
  }
);
