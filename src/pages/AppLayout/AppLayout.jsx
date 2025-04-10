import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AppLayout.module.css";
import LoadingModal from "../../components/LoadingModal/LoadingModal";

function AppLayout() {
  return (
    <>
      <div className={styles.appContainer}>
        <LoadingModal />
        <Navbar loader={true} />
        <div className={styles.contentContainer}>
          <Sidebar />
          <Map />
        </div>
      </div>
    </>
  );
}

export default AppLayout;
