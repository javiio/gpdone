import React, {
  useState,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import { DateTime } from 'luxon';

interface CurrentDateContext {
  date: DateTime
  setDate: (date: DateTime) => void
};

const currentDateContext = createContext<CurrentDateContext>({
  date: DateTime.now().startOf('day'),
  setDate: (date: DateTime) => {},
});

export const ProvideCurrentDate = ({ children }: { children: ReactNode }) => {
  const [date, setDate] = useState<DateTime>(DateTime.now().startOf('day'));

  const value = {
    date,
    setDate,
  };

  return (
    <currentDateContext.Provider value={value}>
      {children}
    </currentDateContext.Provider>
  );
};

export const useCurrentDate = () => useContext(currentDateContext);
