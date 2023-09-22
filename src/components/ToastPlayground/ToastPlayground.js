import React from "react";

import Button from "../Button";
import styles from "./ToastPlayground.module.css";

import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const { data, addNewData } = React.useContext(ToastContext);

  const [currentMessage, setCurrentMessage] = React.useState("");

  const [currentVariant, setCurrentVariant] =
    React.useState("notice");

  const handleMessage = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleRadio = (event) => {
    VARIANT_OPTIONS.includes(event.target.value)
      ? setCurrentVariant(event.target.value)
      : console.error("value not found, " + event.target.value);
  };

  const createToast = (event) => {
    event.preventDefault();
    if (currentMessage.length < 1) {
      window.alert("We need at least 1 letter to POP TOAST!!");
    } else {
      addNewData(currentMessage, currentVariant);
    }
    // removing old message & variant that we no longer need.
    setCurrentMessage("");
    setCurrentVariant("notice");
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form className={styles.controlsWrapper} onSubmit={createToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              placeholder={"Fill me in"}
              value={currentMessage}
              onChange={handleMessage}
              minLength={1}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option, index) => {
              return (
                <label
                  htmlFor={`variant-${option}`}
                  key={`variant-${option}`}
                >
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    value={option}
                    onChange={handleRadio}
                    checked={
                      index ===
                      VARIANT_OPTIONS.indexOf(currentVariant)
                        ? true
                        : false
                    }
                  />
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
      {data.length > 0 && <ToastShelf />}
    </div>
  );
}

export default ToastPlayground;
