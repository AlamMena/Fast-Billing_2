import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./ImagePoster.module.css";

export default function ImagePoster({ images, setImages, setFile }) {
  const postImage = async (file) => {
    try {
      setUrl("images", [url]);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageInput = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setImages([url]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input
          type="file"
          onChange={handleImageInput}
          className={styles.image_input}
        ></input>
        <span className={styles.title}>Selecciona una imagen</span>
      </div>
      <div className={styles.list_container}>
        <span className={styles.list_title}>Listado de imagenes</span>
        {images &&
          images.map((url, index) => {
            return (
              <div key={index} className={styles.img_container}>
                <div className={styles.img_content}>
                  <img className={styles.img} src={url}></img>
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setFile();
                      setImages(images.filter((item) => item !== url)),
                        console.log(url);
                    }}
                    className={styles.icon}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
