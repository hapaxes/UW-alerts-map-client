import ReactDom from "react-dom";

import FilterByCategoriesControl from "./FilterByCategoriesControl";
import SortByControl from "./SortByControl";
import styles from "./SorterModal.module.css";
import useSortingSettings from "../../../hooks/useSortingSettings";
import { useEffect, useRef } from "react";

function SorterModal({ isOpen, onClose }) {
  const {
    allFilterCategories,
    dateRangeSortCategories,
    filterCategoriesToRemove,
    handleApplyClick,
    handleResetClick,
    selectedDateSortCategory,
    selectedSortCategory,
    setFilterCategoriesToRemove,
    setSelectedDateSortCategory,
    setSelectedSortCategory,
    sortCategories,
  } = useSortingSettings();
  const modalRef = useRef(null);

  function handleApply() {
    handleApplyClick();
    onClose();
  }

  function handleReset() {
    handleResetClick();
    onClose();
  }

  useEffect(
    function () {
      function handleClickOutside(e) {
        // if e.target.className is modalwindow, then we want to onClose()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          handleResetClick();
          onClose();
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };

      // add event listener to ref, and on return remove it
    },
    [modalRef, isOpen]
  );

  if (!isOpen) {
    return null;
  }

  return ReactDom.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.sorterContainer} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          <p className={styles.closeButtonContent}>&times;</p>
        </button>
        <SortByControl
          dateRangeSortCategories={dateRangeSortCategories}
          selectedDateSortCategory={selectedDateSortCategory}
          selectedSortCategory={selectedSortCategory}
          setSelectedDateSortCategory={setSelectedDateSortCategory}
          setSelectedSortCategory={setSelectedSortCategory}
          sortCategories={sortCategories}
        />
        <FilterByCategoriesControl
          allFilterCategories={allFilterCategories}
          setFilterCategoriesToRemove={setFilterCategoriesToRemove}
          filterCategoriesToRemove={filterCategoriesToRemove}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleApply}>
            Apply
          </button>
          <button className={styles.rightButton} onClick={handleReset}>
            Reset to default
          </button>
        </div>
        {/* <p>{selectedSortCategory}</p>
        <p>{selectedDateSortCategory}</p>
        <ul>
          {filterCategoriesToRemove.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul> */}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default SorterModal;

// sort by upload date (new to old)
// sort by upload date (old to new)

// filter by category (choose categories)
// filter by has location
