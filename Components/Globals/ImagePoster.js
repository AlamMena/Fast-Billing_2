import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../Firebase/FirebaseAppConfig";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from "./ImagePosterCss.module.css";

export default function ImagePoster({
  images,
  setImages,
  setFile,
  removeImage,
}) {
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
        {images[0] !== undefined &&
          images[0] != "" &&
          images.map((url, index) => {
            return (
              <div key={index} className={styles.img_container}>
                <div className={styles.img_content}>
                  <img className={styles.img} src={url}></img>
                  <AiOutlineCloseCircle
                    onClick={() => {
                      setFile();
                      setImages(images.filter((item) => item !== url));
                      removeImage();
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

const postImage = async (file) => {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, "contacts");
    const response = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(response.ref);
    return url;
  } catch (error) {
    alert(error);
  }
};
export { postImage };
