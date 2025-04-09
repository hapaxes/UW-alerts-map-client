import { useEffect, useState } from "react";
import { useMapContext } from "../contexts/MapContext";

const allCategories = [
  "Crime",
  "Weather",
  "Environment",
  "Health & Wellness",
  "Infrastructure",
  "Facility",
  "Academic",
  "Administrative",
  "General",
  "Traffic",
  "IT",
];

function useSortedList() {
  const { alertsList, setSortedList } = useMapContext();
  const [copiedList, setCopiedList] = useState(alertsList);

  useEffect(
    function () {
      if (alertsList?.length > 0 && copiedList.length === 0) {
        setCopiedList([...alertsList]);
      }
    },
    [alertsList, copiedList]
  );

  function sortByNew(list, sortByNew) {
    const sortedList = [...list].sort((a, b) => {
      const dateA = new Date(a.date.upload_date);
      const dateB = new Date(b.date.upload_date);
      return sortByNew ? dateB - dateA : dateA - dateB;
    });
    return sortedList;
  }

  function filterByCategoriesAndDateRange(list, categories, dateRange) {
    let date = Date.now();
    switch (dateRange) {
      case "from past month":
        date -= 1000 * 60 * 60 * 24 * 31;
        break;
      case "from past 3 months":
        date -= 1000 * 60 * 60 * 24 * 31 * 3;
        break;
      case "from past 6 months":
        date -= 1000 * 60 * 60 * 24 * 31 * 6;
        break;
      case "from past year":
        date -= 1000 * 60 * 60 * 24 * 365;
        break;
      default:
        // include all dates from time t = 0 to Date.now();
        date = 0;
    }

    const filteredList = [...list].filter(
      (item) => {
        const itemCategoriesLower = item.categories.map((category) =>
          category.toLowerCase()
        );

        const categoriesLower = categories.map((category) =>
          category.toLowerCase()
        );

        const itemDate = new Date(item.date.upload_date);

        return (
          !itemCategoriesLower.some((itemCategoryLower) =>
            categoriesLower.includes(itemCategoryLower)
          ) && itemDate.valueOf() >= date
        );
      }
      // if (!list.categories) {
      //   return false;
      // }
      // if the item includes some of the passed categories, return false, in other words REMOVE IT
    );
    return filteredList;
  }

  function sortList(byNew, includedCategories = allCategories, dateRange) {
    let sortedAndFilteredList = [...alertsList];
    sortedAndFilteredList = sortByNew(sortedAndFilteredList, byNew);
    sortedAndFilteredList = filterByCategoriesAndDateRange(
      sortedAndFilteredList,
      includedCategories,
      dateRange
    );

    setSortedList(sortedAndFilteredList);
  }

  return { sortList, sortedList: copiedList };
}

export default useSortedList;

// 4/1/25 combined this function with the categories function to optimize

// function filterByDateRange(list, dateRange) {
//   let date = Date.now();
//   switch (dateRange) {
//     case "from past month":
//       date -= 1000 * 60 * 60 * 24 * 31;
//       break;
//     case "from past 3 months":
//       date -= 1000 * 60 * 60 * 24 * 31 * 3;
//       break;
//     case "from past 6 months":
//       date -= 1000 * 60 * 60 * 24 * 31 * 6;
//       break;
//     case "from past year":
//       date -= 1000 * 60 * 60 * 24 * 365;
//       break;
//     default:
//       // include all dates from time t = 0 to Date.now();
//       date = 0;
//   }

//   const filteredList = [...list].filter((item) => {
//     const itemDate = new Date(item.date.upload_date);
//     return itemDate.valueOf() >= date;
//   });

//   return filteredList;
// }
