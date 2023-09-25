import React from "react";

import { useKeyDown } from "../../hooks/HandleKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [data, setData] = React.useState([{}]);

  // register infomation about toast and put it in 'data' array.
  const addNewData = (message, variant) => {
    // generating random ID for value.
    const id = crypto.randomUUID();
    // creating a object containg message & variant that a user input.
    const newItem = {
      message: message,
      variant: variant,
      id: id,
    };
    // storing the object.
    const newData = [...data, newItem];
    setData(newData);
  };

  // remove single toaster by clicking x button.
  const removeToaster = (id) => {
    const tempData = [...data];
    const newData = tempData.filter((item) => {
      return item.id !== id;
    });
    setData(newData);
  };

  // remove all toasters by hitting ESC key.

  const clearToaster = () => {
    if (0 < data.length) {
      setData([{}]);
    }
  };

  useEscapeKey(clearToaster, [setData]);

  return (
    <ToastContext.Provider
      value={{
        data,
        setData,
        addNewData,
        removeToaster,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
