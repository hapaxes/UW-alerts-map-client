import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMapContext } from "../../contexts/MapContext";

import BackButton from "../BackButton/BackButton";

import styles from "./AlertPostNav.module.css";
import LeftRightNav from "./LeftRightNav/LeftRightNav";

function AlertPostNav({ post_id }) {
  const { sortedList } = useMapContext();
  // in the case that a user navigates to the page by url, the sortedList could
  // be fetched as the user lands on the page. In that case, we want to
  // watch the sortedList and update corresponding data when sortedList is
  // loaded
  const [prevPostLink, setPrevPostLink] = useState("");
  const [nextPostLink, setNextPostLink] = useState("");
  const [prevIsDisabled, setPrevIsDisabled] = useState(true);
  const [nextIsDisabled, setNextIsDisabled] = useState(true);

  const postIndex = sortedList.findIndex((item) => item.post_id === post_id);

  useEffect(
    function () {
      const prevItem = sortedList[postIndex - 1];
      let prevToLink = `${prevItem?.post_id}`;
      const prevHasLocation = prevItem?.location;
      if (prevHasLocation) {
        prevToLink += `?&lat=${prevItem.location.latitude}&lng=${prevItem.location.longitude}`;
      }

      const nextItem = sortedList[postIndex + 1];
      let nextToLink = `${nextItem?.post_id}`;
      const nextHasLocation = nextItem?.location;
      if (nextHasLocation) {
        nextToLink += `?&lat=${nextItem.location.latitude}&lng=${nextItem.location.longitude}`;
      }

      setPrevIsDisabled(postIndex === 0);
      setNextIsDisabled(postIndex === sortedList?.length - 1);

      setPrevPostLink(prevToLink);
      setNextPostLink(nextToLink);
    },
    [sortedList, postIndex]
  );

  return (
    <div className={styles.buttonContainer}>
      <Link to={!prevIsDisabled && "/list/" + prevPostLink}>
        <LeftRightNav disabled={prevIsDisabled} left={true} />
      </Link>
      <BackButton />
      <Link to={!nextIsDisabled && "/list/" + nextPostLink}>
        <LeftRightNav disabled={nextIsDisabled} left={false} />
      </Link>
    </div>
  );
}
export default AlertPostNav;
