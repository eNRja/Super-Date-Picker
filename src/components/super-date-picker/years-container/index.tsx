import React, {
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import styles from "./YearsContainer.module.css";
import { currentYear } from "../../../utils/days";
import { Years } from "./years";
import {
  firstDisplayedYear,
  halfTotalYears,
  marginBottom,
  totalYears,
} from "../../../utils/constants";

interface IYearsContainerProps {
  displayedMonth: number;
  displayedYear: number;
  onYearChange: (newYear: number) => void;
  setIsMonthChoose: Dispatch<SetStateAction<boolean>>;
  setIsYearChoose: Dispatch<SetStateAction<boolean>>;
}

export const YearsContainer = forwardRef(
  (
    {
      displayedYear,
      onYearChange,
      setIsMonthChoose,
      setIsYearChoose,
    }: IYearsContainerProps,
    ref
  ) => {
    const yearContainerRef = useRef<HTMLDivElement | null>(null);

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
      const middleIndex = displayedYear - firstDisplayedYear;
      console.log(middleIndex);
      const container = yearContainerRef.current;

      if (container) {
        const middleElement = container.children[middleIndex] as HTMLElement;
        const containerHeight = container.clientHeight + marginBottom;

        container.scrollTop = middleElement.offsetTop - containerHeight;
      }
    }, []);

    return (
      <div ref={yearContainerRef} className={styles.YearsContainer}>
        {Array.from(
          { length: totalYears },
          (_, i) => currentYear - halfTotalYears + i
        ).map((year, index) => (
          <Years
            key={index}
            year={year}
            setIsMonthChoose={setIsMonthChoose}
            setIsYearChoose={setIsYearChoose}
            onYearChange={onYearChange}
          />
        ))}
      </div>
    );
  }
);
