import styles from "./FilterByCategoriesControl.module.css";

function FilterByCategoriesControl({
  allFilterCategories,
  setFilterCategoriesToRemove,
  filterCategoriesToRemove,
}) {
  // categories in this array are items I want to see in rendered list

  function handleCategoryClick(category) {
    if (filterCategoriesToRemove.includes(category)) {
      // remove it
      setFilterCategoriesToRemove((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else {
      setFilterCategoriesToRemove((prevCategories) => [
        ...prevCategories,
        category,
      ]);
    }
  }

  return (
    <div>
      <p className={styles.label}>Select categories to exclude</p>
      <ul id="filter-categories" className={styles.categoriesList}>
        {allFilterCategories.map((category) => {
          const isChecked = filterCategoriesToRemove.includes(category);
          return (
            <li
              className={styles.category}
              key={category}
              onClick={() => handleCategoryClick(category)}
            >
              <input
                className={styles.input}
                checked={isChecked}
                id={category}
                onChange={() => handleCategoryClick(category)}
                type="checkbox"
              />
              <label
                htmlFor={category}
                className={`${
                  isChecked ? styles.inputChecked : styles.inputNotChecked
                }`}
              >
                {category}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FilterByCategoriesControl;
