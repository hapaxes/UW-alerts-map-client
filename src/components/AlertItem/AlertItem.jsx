import { useMapContext } from "../../contexts/MapContext";
import styles from "./AlertItem.module.css";
import { Link } from "react-router-dom";

function AlertItem({ alertItem }) {
  const { setAlertPostLoading } = useMapContext();
  const { post_id, title, date: dateObj, categories } = alertItem;
  const uploadDate = dateObj?.upload_date;

  function getFormattedDate(dateStr) {
    const date = new Date(dateStr); // Parse the date string into a Date object

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);

    return `${month}/${day}/${year}`;
  }

  const hasLocation = alertItem.location;

  let toLink = `${post_id}`;
  if (hasLocation) {
    toLink += `?&lat=${alertItem.location.latitude}&lng=${alertItem.location.longitude}`;
  }

  // the svg is just the little visual on the right side of the alertItem component
  return (
    <Link to={toLink} onClick={() => setAlertPostLoading(post_id)}>
      <div className={styles.container}>
        {hasLocation && (
          <div className={styles.locationIndicator}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="24"
              height="24"
            >
              <path
                fill="#6a4ba120"
                stroke="#190a3620"
                strokeWidth="1"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
              />
            </svg>
          </div>
        )}
        <div className={styles.patch}></div>
        <div className={styles.patchCover}></div>
        <div className={styles.information}>
          <h3>{title}</h3>
          <p className={styles.date}>{getFormattedDate(uploadDate)}</p>
          <p className={styles.categories}>{categories.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}

export default AlertItem;

/**
 * date, title, category(color)
 *
 */

// light_data format (alerts)

// {
//   "post_id": "post-3903",
//   "url": "https://emergency.uw.edu/2024/08/20/email-delivery-delay/",
//   "title": "Email delivery delay",
//   "date": {
//     "upload_date": "2024-08-20T07:04:56-07:00",
//     "update_date": "2024-08-21T07:56:07-07:00"
//   },
//   "categories": [
//     "administrative",
//     "academic",
//     "facility"
//   ],
//   "location": {
//     "latitude": 47.6631217,
//     "longitude": -122.3142502
//   }
// }
