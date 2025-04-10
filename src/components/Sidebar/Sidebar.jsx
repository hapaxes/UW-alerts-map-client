import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebarContainer}>
      {
        // <Outlet/> comes from App.jsx. Whenever the url parameter after /list changes
        // whatever is rendered is put there.
        // if we go to /list we get this returned:
        //   <>
        //   <Sorter />
        //   <AlertList />
        // </>
        // otherwise we get this returned
        // <AlertPost/>
        //
        // clicking on an AlertItem in the AlertList adds the post_id to the url
        // thats where things come from
      }
      <Outlet />
    </div>
  );
}

export default Sidebar;
