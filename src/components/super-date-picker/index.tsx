import React, { useEffect, useRef, useState } from "react";
import styles from "./SuperDatePicker.module.css";
import { GridContainer } from "./grid-container";
import ArrowUp from "../../image/arrow_up.svg";
import ArrowDown from "../../image/arrow_down.svg";
import {
  currentDate,
  currentMonthNameSecondary,
  fullDaysOfWeek,
  getCurrentDayOfWeek,
  monthNames,
} from "../../utils/days";
import { YearContainer } from "./year-container";
import { YearsContainer } from "./years-container";
import { IYearContainerRef } from "../../types";
import { FooterModal } from "./footerModal";

interface ISuperDatePicker {
  onSave: (itemFrom: Date, itemTo: Date | null) => void;
}

export function SuperDatePicker({ onSave }: ISuperDatePicker) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMonthChoose, setIsMonthChoose] = useState(false);
  const [isYearChoose, setIsYearChoose] = useState(false);
  const [displayedDate, setDisplayedDate] = useState(new Date());
  const [displayedYear, setDisplayedYear] = useState(
    displayedDate.getFullYear()
  );

  const displayedMonth = displayedDate.getMonth();
  const displayedMonthName = monthNames[displayedDate.getMonth()];
  const header = `${getCurrentDayOfWeek(
    fullDaysOfWeek
  )}, ${currentDate.getDate()} ${currentMonthNameSecondary}`;

  const YearRef = useRef<IYearContainerRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
    setIsMonthChoose(false);
    setIsYearChoose(false);
    setDisplayedDate(new Date());
  };

  const handlePrevMonth = () => {
    setDisplayedDate(new Date(displayedYear, displayedMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayedDate(new Date(displayedYear, displayedMonth + 1, 1));
  };

  const handleYearChange = (newYear: number) => {
    setDisplayedYear(newYear);
  };

  const handleMonth = () => {
    setIsMonthChoose(true);
  };

  const handleYear = () => {
    setIsYearChoose(true);
    setIsMonthChoose(false);
  };

  const handleScrollDown = () => {
    YearRef.current &&
      (YearRef.current as unknown as IYearContainerRef).scrollDown(222);
  };

  const handleScrollUp = () => {
    YearRef.current &&
      (YearRef.current as unknown as IYearContainerRef).scrollUp(222);
  };

  useEffect(() => {
    setDisplayedYear(displayedDate.getFullYear());
  }, [displayedDate]);

  return !isOpen ? (
    <div>
      <div className={styles.Container} ref={containerRef}>
        <div className={styles.Header}>
          <p>{header}</p>
          <div
            className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
            onClick={handleArrowClick}
          >
            <span className={styles.arrowleft}></span>
            <span className={styles.arrowright}></span>
          </div>
        </div>
        <div className={styles.Month}>
          {!isMonthChoose && !isYearChoose && (
            <p
              onClick={handleMonth}
            >{`${displayedMonthName} ${displayedYear}`}</p>
          )}
          {isMonthChoose && !isYearChoose && (
            <p onClick={handleYear}>{displayedYear} г.</p>
          )}
          {isYearChoose && !isMonthChoose && (
            <p onClick={handleYear}>Выберите год</p>
          )}
          <div className={styles.MonthButtons}>
            <button
              className={styles.MonthButtonUpDown}
              onClick={
                isMonthChoose || isYearChoose ? handleScrollUp : handlePrevMonth
              }
            >
              <img className={styles.MonthButtonImg} src={ArrowUp} alt="up" />
            </button>
            <button
              className={styles.MonthButtonUpDown}
              onClick={
                isMonthChoose || isYearChoose
                  ? handleScrollDown
                  : handleNextMonth
              }
            >
              <img
                className={styles.MonthButtonImg}
                src={ArrowDown}
                alt="down"
              />
            </button>
          </div>
        </div>
        {isMonthChoose && !isYearChoose && (
          <YearContainer
            ref={YearRef}
            displayedYear={displayedYear}
            setDisplayedDate={setDisplayedDate}
            setIsMonthChoose={setIsMonthChoose}
            onYearChange={handleYearChange}
          />
        )}
        {isYearChoose && !isMonthChoose && (
          <YearsContainer
            ref={YearRef}
            displayedYear={displayedYear}
            displayedMonth={displayedMonth}
            onYearChange={handleYearChange}
            setIsMonthChoose={setIsMonthChoose}
            setIsYearChoose={setIsYearChoose}
          />
        )}
        {!isMonthChoose && !isYearChoose && (
          <GridContainer
            displayedMonth={displayedMonth}
            displayedYear={displayedYear}
          />
        )}
      </div>
      <FooterModal onSave={onSave} />
    </div>
  ) : (
    <div className={`${styles.Container} ${styles.ContainerSmall}`}>
      <div className={styles.Header}>
        <p>{header}</p>
        <div
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          onClick={handleArrowClick}
        >
          <span className={styles.arrowleft}></span>
          <span className={styles.arrowright}></span>
        </div>
      </div>
    </div>
  );
}
