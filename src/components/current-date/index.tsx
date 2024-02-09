import React from "react";
import { useEffect, useState } from "react";
import styles from "./CurrentDate.module.css";

export const CurrentDate = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();

  return (
    <div className={styles.CurrentDate}>
      <h2>Текущие дата и время:</h2>
      <p>{formattedDateTime}</p>
    </div>
  );
};
