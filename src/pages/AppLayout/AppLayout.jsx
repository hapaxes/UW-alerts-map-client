import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        <Map />
      </div>
    </div>
  );
}

export default AppLayout;
