import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { CurrentDate } from "../../components/current-date";
import styles from "./Main.module.css";
import { SuperDatePicker } from "../../components/super-date-picker";
import { DateProvider } from "../../hooks/dateContext";
import { DateFromTo } from "../../components/date-from-to";

export const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClearData = () => {
    setDateTo(null);
    setDateFrom(null);
  };

  const onSave = (itemFrom: Date, itemTo: Date | null) => {
    if (itemTo) {
      setDateFrom(itemFrom);
      setDateTo(itemTo);
    } else {
      setDateFrom(itemFrom);
      setDateTo(null);
    }

    handleCloseModal();
  };

  return (
    <>
      <div className={styles.Main}>
        <CurrentDate />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Открыть календарь
        </Button>
        <DateFromTo
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          handleClearData={handleClearData}
        />
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        className={styles.Modal}
      >
        <DateProvider>
          <SuperDatePicker onSave={onSave} />
        </DateProvider>
      </Modal>
    </>
  );
};
