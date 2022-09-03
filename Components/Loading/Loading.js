import { AiOutlineLoading } from "react-icons/ai";
import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img src="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png" />
        </div>
        <div>
          <div className={styles.loading}>
            <AiOutlineLoading className={styles.icon} />
            <div> Cargando...</div>
          </div>
        </div>
      </div>
    </>
  );
}
