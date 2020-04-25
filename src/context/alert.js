import React from 'react';

const AlertContext = React.createContext();
function AlertProvider({ children }) {
  const [alert, setAlert] = React.useState({ show: false });

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };
  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
        handleAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
export { AlertProvider, AlertContext };
