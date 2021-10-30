import React from "react";
import styles from "./spinnerStyle.module.css";
import { Spinner } from "react-bootstrap";

const Spinnerr = () => {
  return (
    <div className={styles.loader}>
      <Spinner
        className={styles.spinner}
        animation="border"
        size="xl"
        variant="light"
      />
    </div>
  );
};

export default Spinnerr;
