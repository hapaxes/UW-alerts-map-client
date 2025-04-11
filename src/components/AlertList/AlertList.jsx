import styles from "./AlertList.module.css";
import { useMapContext } from "../../contexts/MapContext";
import Loader from "../Loader/Loader.jsx";
import AlertItem from "../AlertItem/AlertItem.jsx";
import { useEffect, useState } from "react";

const INITIAL_LOAD_COUNT = 10;

function AlertList() {
  const { alertsAreLoading, unfocusPost, sortedList } = useMapContext();
  // const { sortedList } = useSortedList();
  const [visibleItems, setVisibleItems] = useState([]);
  const [restOfList, setRestOfList] = useState([]);

  // the list was taking too long to render. When going from a focusedAlertPost
  // back to /list, there was a visual bug where a div from the AlertPost would
  // still be rendered for a split second.

  // tried to split up the rendering of the alertsList (~170 items) into two batches
  // first render 10 items (list shows ~6 at normal zoom), then render the rest of
  // the items
  useEffect(
    function () {
      if (!sortedList) {
        return;
      }

      const partialList = sortedList.slice(0, INITIAL_LOAD_COUNT);
      setVisibleItems(partialList);

      setTimeout(() => {
        setRestOfList(sortedList.slice(INITIAL_LOAD_COUNT));
      }, 100);
    },
    [sortedList]
  );

  // from a focusedAlertPost state, when we click "back", the logic was to first unfocus
  // the post, then navigate to /list. This caused a visual bug as the AlertPostContent would
  // have two divs that would still render (small visual bug)

  // instead, we assume that if we render AlertsList, we don't have a focused post,
  // and unfocus here instead. (in short, navigate first to /list, then unfocus post
  // instead of unfocus, then navigate to /list)

  // it's unreliable to navigate then to go unfocus in the alert post component
  useEffect(function () {
    unfocusPost();
  }, []);

  if (alertsAreLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.alertListContainer}>
      {visibleItems?.map((alert) => (
        <AlertItem key={alert._id} alertItem={alert} />
      ))}
      {restOfList.length > 0 &&
        restOfList.map((alert) => (
          <AlertItem key={alert._id} alertItem={alert} />
        ))}
    </div>
  );
}

export default AlertList;
