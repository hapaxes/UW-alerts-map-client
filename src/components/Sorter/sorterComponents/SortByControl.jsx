import { useState } from "react";
import styles from "./SortByControl.module.css";

function SortByControl({
  dateRangeSortCategories,
  selectedDateSortCategory,
  selectedSortCategory,
  setSelectedDateSortCategory,
  setSelectedSortCategory,
  sortCategories,
}) {
  return (
    <div className={styles.filterContainer}>
      <label className={styles.label} htmlFor="select-order">
        Sort by new / old
      </label>
      <select
        id="select-order"
        className={styles.select}
        value={selectedSortCategory}
        onChange={(e) => setSelectedSortCategory(e.target.value)}
      >
        {sortCategories?.map((category) => (
          <option className={styles.option} key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label className={styles.label} htmlFor="select-daterange">
        Sort by upload date
      </label>
      <select
        id="select-daterange"
        className={styles.select}
        value={selectedDateSortCategory}
        onChange={(e) => setSelectedDateSortCategory(e.target.value)}
      >
        {dateRangeSortCategories.map((category) => (
          <option className={styles.option} key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByControl;
