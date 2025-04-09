import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/list">
        <div className={styles.imgContainer}>
          <img src="/src/assets/Logo.png" />
        </div>
      </Link>
      <h1>U-District Alerts Map</h1>
    </div>
  );
}

export default Logo;
