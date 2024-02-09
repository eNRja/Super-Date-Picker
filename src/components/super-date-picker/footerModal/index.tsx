import React from "react";
import { useDateContext } from "../../../hooks/dateContext";
import styles from "./FooterModal.module.css";
import { Button } from "@mui/material";
import { monthNamesSecondary } from "../../../utils/days";

interface IFooterModal {
  onSave: (itemFrom: Date, itemTo: Date | null) => void;
}

export const FooterModal = ({ onSave }: IFooterModal) => {
  const {
    choosenDate,
    choosenRangeStartDate,
    choosenRangeEndDate,
    setChoosenDate,
    setChoosenRangeStartDate,
    setChoosenRangeEndDate,
    setSelectedIndex,
  } = useDateContext();

  const refresh = () => {
    setChoosenDate(null);
    setChoosenRangeStartDate(null);
    setChoosenRangeEndDate(null);
    setSelectedIndex(null);
  };

  console.log("GG", choosenRangeStartDate);

  if (!choosenDate || !choosenRangeStartDate) {
    return null;
  }

  return (
    <div className={styles.MainDate}>
      {!choosenRangeEndDate && (
        <p className={styles.MainDateText}>{`${choosenDate.getDate()} ${
          monthNamesSecondary[choosenDate.getMonth()]
        } ${choosenDate.getFullYear()} г.`}</p>
      )}
      {choosenRangeEndDate && choosenRangeStartDate && (
        <p
          className={styles.MainDateText}
        >{`${choosenRangeStartDate.getDate()} ${
          monthNamesSecondary[choosenRangeStartDate.getMonth()]
        } ${choosenRangeStartDate.getFullYear()} г. - ${choosenRangeEndDate.getDate()} ${
          monthNamesSecondary[choosenRangeEndDate.getMonth()]
        } ${choosenRangeEndDate.getFullYear()} г.`}</p>
      )}
      <div className={styles.MainDateButtons}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() =>
            onSave(
              !choosenRangeEndDate ? choosenDate : choosenRangeStartDate,
              choosenRangeEndDate
            )
          }
        >
          Применить
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={refresh}
        >
          Сбросить
        </Button>
      </div>
    </div>
  );
};
