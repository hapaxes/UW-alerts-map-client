import styles from "./AlertList.module.css";
import { useMapContext } from "../../contexts/MapContext";
import Loader from "../Loader/Loader.jsx";
import AlertItem from "../AlertItem/AlertItem.jsx";
import useSortedList from "../../hooks/useSortedList.js";

function AlertList() {
  const { alertsAreLoading } = useMapContext();
  const { sortedList } = useSortedList();

  if (alertsAreLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.alertListContainer}>
      {sortedList?.map((alert) => (
        <AlertItem key={alert._id} alertItem={alert} />
      ))}
    </div>
  );
}

export default AlertList;
