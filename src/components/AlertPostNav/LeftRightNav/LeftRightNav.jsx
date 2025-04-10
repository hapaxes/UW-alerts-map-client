import styles from "./LeftRightNav.module.css";

function LeftRightNav({ disabled, left }) {
  return (
    <div className={styles.buttonNavLabelContainer}>
      <p
        id={`alert-post-nav-${left ? "<" : ">"}`}
        className={`${styles.buttonNav} ${disabled && styles.buttonDisabled}`}
      >
        {left ? "<" : ">"}
      </p>
      {!disabled && (
        <label
          htmlFor={`alert-post-nav-${left ? "<" : ">"}`}
          className={styles.buttonNavLabel}
        >
          {left ? "Previous post" : "Next post"}
        </label>
      )}
    </div>
  );
}

export default LeftRightNav;
