import { Button } from "@mui/material";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatDate } from "../../utils/days";
import styles from "./DateFromTo.module.css";

interface IDateFromTo {
  dateFrom: null | Date;
  dateTo: null | Date;
  setDateFrom: Dispatch<SetStateAction<Date | null>>;
  setDateTo: Dispatch<SetStateAction<Date | null>>;
  handleClearData: () => void;
}

export const DateFromTo = ({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  handleClearData,
}: IDateFromTo) => {
  const [editingTime, setEditingTime] = useState(false);
  const [timeInputFrom, setTimeInputFrom] = useState("");
  const [timeInputTo, setTimeInputTo] = useState("");

  const handleEditTime = () => {
    setEditingTime(true);
  };

  const handleSaveTime = () => {
    setEditingTime(false);
    if (timeInputFrom && dateFrom) {
      const [hours, minutes, seconds] = timeInputFrom.split(":").map(Number);
      const newDate = new Date(dateFrom);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(seconds);
      setDateFrom(newDate);
    }
    if (timeInputTo && dateTo) {
      const [hours, minutes, seconds] = timeInputTo.split(":").map(Number);
      const newDate = new Date(dateTo);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      newDate.setSeconds(seconds);
      setDateTo(newDate);
    }
  };

  const handleTimeInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setTimeInput: Dispatch<SetStateAction<string>>
  ) => {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^0-9:]/g, "");

    if (sanitizedInput.length <= 8) {
      setTimeInput(sanitizedInput);
    }
  };

  useEffect(() => {
    if (dateFrom) {
      const h = dateFrom.getHours().toString().padStart(2, "0");
      const m = dateFrom.getMinutes().toString().padStart(2, "0");
      const s = dateFrom.getSeconds().toString().padStart(2, "0");
      setTimeInputFrom(`${h}:${m}:${s}`);
    }
    if (dateTo) {
      const h = dateTo.getHours().toString().padStart(2, "0");
      const m = dateTo.getMinutes().toString().padStart(2, "0");
      const s = dateTo.getSeconds().toString().padStart(2, "0");
      setTimeInputTo(`${h}:${m}:${s}`);
    }
  }, [dateFrom, dateTo]);

  if (!dateFrom) {
    return null;
  }
  return (
    <div className={styles.DateFromTo}>
      <h3 className={styles.DateFromToTitle}>{`Вы выбрали${
        dateTo ? " диапазон" : ""
      }:`}</h3>
      <p>
        {dateTo
          ? `${formatDate(dateFrom)} - ${formatDate(dateTo)}`
          : formatDate(dateFrom)}
      </p>
      <div className={styles.DateFromToButtonsArea}>
        <Button size="small" onClick={handleClearData}>
          Сбросить
        </Button>
        {editingTime ? (
          <Button size="small" variant="contained" onClick={handleSaveTime}>
            Сохранить время
          </Button>
        ) : (
          <Button size="small" variant="contained" onClick={handleEditTime}>
            Редактировать время
          </Button>
        )}
      </div>
      <div className={styles.DateFromToInputArea}>
        {editingTime && (
          <div className={styles.DateFromToInput}>
            <input
              placeholder="00:00:00"
              value={timeInputFrom}
              onChange={(e) => handleTimeInputChange(e, setTimeInputFrom)}
              maxLength={8}
            />
            <label>чч:мм:сс</label>
          </div>
        )}
        {editingTime && dateTo && (
          <div className={styles.DateFromToInput}>
            <input
              placeholder="00:00:00"
              value={timeInputTo}
              onChange={(e) => handleTimeInputChange(e, setTimeInputTo)}
              maxLength={8}
            />
            <label>чч:мм:сс</label>
          </div>
        )}
      </div>
    </div>
  );
};
