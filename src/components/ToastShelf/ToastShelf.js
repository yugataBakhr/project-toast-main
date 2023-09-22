import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { data } = React.useContext(ToastContext);
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {data.map((item) => {
        return (
          <li className={styles.toastWrapper} key={item.id}>
            <Toast
              message={item.message}
              variant={item.variant}
              id={item.id}
            />
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
