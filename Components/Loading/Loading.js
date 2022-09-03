import { AiOutlineLoading } from "react-icons/ai";
import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3bAlqaZSh0mViahdE_MNIduBQZBWwyBEZtA&usqp=CAU" />
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
