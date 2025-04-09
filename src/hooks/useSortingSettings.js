import { useState } from "react";
import useSortedList from "./useSortedList";

const sortCategories = ["Post date (new to old)", "Post date (old to new)"];
const dateRangeSortCategories = [
  "all",
  "from past year",
  "from past 6 months",
  "from past 3 months",
  "from past month",
];
const allFilterCategories = [
  "crime",
  "weather",
  "environment",
  "health & wellness",
  "infrastructure",
  "facility",
  "academic",
  "administrative",
  "general",
  "traffic",
  "IT",
  "Hazardous Material",
  "fire",
];

function useSortingSettings() {
  const [selectedSortCategory, setSelectedSortCategory] = useState(
    sortCategories[0]
  );
  const [selectedDateSortCategory, setSelectedDateSortCategory] = useState(
    dateRangeSortCategories[0]
  );
  const [filterCategoriesToRemove, setFilterCategoriesToRemove] = useState([]);
  const { sortList } = useSortedList();

  function handleApplyClick() {
    if (selectedSortCategory === "") {
      return;
    }

    const sortByNew = selectedSortCategory === sortCategories[0];
    sortList(sortByNew, filterCategoriesToRemove, selectedDateSortCategory);
  }

  function handleResetClick() {
    setSelectedSortCategory(sortCategories[0]);
    setSelectedDateSortCategory(dateRangeSortCategories[0]);
    setFilterCategoriesToRemove([]);
    sortList(true, filterCategoriesToRemove, dateRangeSortCategories);
  }

  return {
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
  };
}

export default useSortingSettings;
