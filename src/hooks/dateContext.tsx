import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IDateContextProps {
  choosenDate: Date | null;
  choosenRangeStartDate: Date | null;
  choosenRangeEndDate: Date | null;
  selectedIndex: number | null;
  setChoosenDate: Dispatch<SetStateAction<Date | null>>;
  setChoosenRangeStartDate: Dispatch<SetStateAction<Date | null>>;
  setChoosenRangeEndDate: Dispatch<SetStateAction<Date | null>>;
  setSelectedIndex: Dispatch<SetStateAction<number | null>>;
}

const DateContext = createContext<IDateContextProps | undefined>(undefined);

export const DateProvider = ({ children }: { children: ReactNode }) => {
  const [choosenDate, setChoosenDate] = useState<Date | null>(null);
  const [choosenRangeStartDate, setChoosenRangeStartDate] =
    useState<Date | null>(null);
  const [choosenRangeEndDate, setChoosenRangeEndDate] = useState<Date | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const contextValue: IDateContextProps = {
    choosenDate,
    choosenRangeStartDate,
    choosenRangeEndDate,
    selectedIndex,
    setChoosenDate,
    setChoosenRangeStartDate,
    setChoosenRangeEndDate,
    setSelectedIndex,
  };

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

export const useDateContext = (): IDateContextProps => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("Something wrong..");
  }
  return context;
};
