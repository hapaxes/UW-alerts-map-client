import styles from "./PageNotFound.module.css";
import BackButton from "../../components/BackButton/BackButton";
function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.message}>Page Not Found😞</h1>
      <div className={styles.buttonsContainer}>
        <BackButton text={"Click here to redirect to App"} />
      </div>
    </div>
  );
}

export default PageNotFound;
