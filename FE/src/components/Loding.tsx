import React from "react";
import styles from "./css/Loding.module.css";

interface Props {
  backgroundBlur?: boolean;
}

export const Loding = ({ backgroundBlur }: Props) => {
  return (
    <div className={`${styles.container} ${backgroundBlur ? styles.backgroundBlur : ""}`}>
      <div className={styles.box}>
        <div className={styles.loader} />
      </div>
    </div>
  );
};

Loding.defaultProps = {
  backgroundBlur: false,
};

export default Loding;
