import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";
function BackButton({ onClick, text }) {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    navigate("/list");
  }

  return (
    // left arrow character : \u2190
    <button className={styles.button} onClick={handleClick}>
      {text ? text : "\u2190 Back"}
    </button>
  );
}

export default BackButton;
