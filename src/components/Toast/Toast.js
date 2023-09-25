import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

import { ToastContext } from "../ToastProvider";

const ICONS_BY_VARIANT = {
  notice: [Info, styles.notice],
  warning: [AlertTriangle, styles.warning],
  success: [CheckCircle, styles.success],
  error: [AlertOctagon, styles.error],
};

function Toast({ message, variant, id }) {
  if (!id) {
    return;
  }
  const Icon = ICONS_BY_VARIANT[variant][0];

  const { removeToaster } = React.useContext(ToastContext);

  return (
    <div
      className={`${styles.toast} ${ICONS_BY_VARIANT[variant][1]}`}
    >
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{`${variant}-`}</VisuallyHidden>
        {message}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => removeToaster(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
        {/* <VisuallyHidden>Dismiss toast</VisuallyHidden> */}
      </button>
    </div>
  );
}

export default Toast;
