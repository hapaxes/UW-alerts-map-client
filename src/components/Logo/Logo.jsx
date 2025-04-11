import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/list"></Link>
      <h1>U-District Alerts Map</h1>
    </div>
  );
}

export default Logo;
