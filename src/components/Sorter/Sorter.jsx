import { useState } from "react";
import styles from "./Sorter.module.css";
import SorterModal from "./sorterComponents/SorterModal";

function Sorter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((open) => !open)}
      >
        Sort / Filter Posts
      </button>
      <SorterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default Sorter;
