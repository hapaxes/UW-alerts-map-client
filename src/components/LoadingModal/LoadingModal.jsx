import ReactDom from "react-dom";

import styles from "./LoadingModal.module.css";
import { useEffect, useRef, useState } from "react";

function LoadingModal() {
  const [isOpen, setIsOpen] = useState(function () {
    const hasClosedBefore = sessionStorage.getItem("modalClosed");
    // modalClosed is stored as "true" if closedbefore, so we want
    // isOpen to be false
    // console.log(sessionStorage.getItem("modalClosed"));
    return hasClosedBefore ? !JSON.parse(hasClosedBefore) : true;
  });

  function handleClose() {
    sessionStorage.setItem("modalClosed", "true");
    setIsOpen(false);
  }

  useEffect(
    function () {
      function handleClick(e) {
        handleClose();
      }

      document.addEventListener("mousedown", handleClick);

      return function () {
        document.removeEventListener("mousedown", handleClick);
      };
    },
    [isOpen]
  );

  return ReactDom.createPortal(
    <>
      {!isOpen && null}
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modal}>
            This site is hosted on a free-tier, so the server may be asleep 😴.
            Please give it a second to wake up!
            <div className={styles.x} onClick={handleClose}>
              &times;
            </div>
            <p className={styles.exitMessage}>
              &sim; Click anywhere to close this message &sim;
            </p>
          </div>
        </div>
      )}
    </>,
    document.getElementById("portal")
  );
}

export default LoadingModal;
