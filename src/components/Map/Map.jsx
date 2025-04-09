import { MapContainer, TileLayer, useMap } from "react-leaflet";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMapContext } from "../../contexts/MapContext";
import { useUrlParams } from "../../hooks/useUrlParams";
import Loader from "../Loader/Loader";
import MapMarker from "../MapMarker/MapMarker";
import styles from "./Map.module.css";

// center of UW campus, latitude and longitude
const UW_LAT = 47.655678;
const UW_LNG = -122.304553;
const DEFAULT_MAP_CENTER = [UW_LAT, UW_LNG];
const MAP_MAX_BOUNDS_DELTA = 0.1;
// latitude (first value) scales faster than longitude (second value) near uw
const MAP_MAX_BOUNDS = [
  [UW_LAT - MAP_MAX_BOUNDS_DELTA, UW_LNG - 1.5 * MAP_MAX_BOUNDS_DELTA],
  [UW_LAT + MAP_MAX_BOUNDS_DELTA, UW_LNG + 1.5 * MAP_MAX_BOUNDS_DELTA],
];
// 0 - 16, higher value is more zoom
const DEFAULT_ZOOM = 15;

function Map() {
  const [mapPosition, setMapPosition] = useState(DEFAULT_MAP_CENTER);
  const { alertsAreLoading, unfocusPost, sortedList, focusedAlert } =
    useMapContext();

  const {
    location: [lat, lng],
  } = useUrlParams();

  const navigate = useNavigate();
  const noPostId = lat && lng && Object.keys(focusedAlert).length === 0;

  // callback passed to MapMarker
  function onMarkerClick() {
    unfocusPost();
    navigate("/list");
  }

  // checks whether the current alertItem should be focused (popup should open)
  // Also, checks whether the url parameters are valid
  // -> does postId exist?
  // -> does lat, lng match postId of focusedAlert?

  function getFocused(alertItem) {
    // if no alertItem is focused, all of the items should be rendered as focused
    const noLocation = !lat && !lng;

    if (noLocation || noPostId) {
      return "no-post-is-focused";
    }

    if (
      lat === "" + alertItem.location.latitude &&
      lng === "" + alertItem.location.longitude
    ) {
      return "this-post-is-focused";
    }

    return "this-post-is-not-focused";
  }

  useEffect(
    function () {
      if (lat && lng) {
        setMapPosition({ lat, lng });
      }
    },
    [lat, lng]
  );

  // if latitude and longitude in the url don't match the focusedAlert
  // lat and lng, navigate to the correct lat and lng
  useEffect(
    function () {
      if (
        focusedAlert &&
        focusedAlert.location &&
        ("" + focusedAlert.location.latitude !== lat ||
          "" + focusedAlert.location.longitude !== lng)
      ) {
        navigate(
          `/list/${focusedAlert.post_id}?&lat=${focusedAlert.location.latitude}&lng=${focusedAlert.location.longitude}`
        );
      }
    },
    [focusedAlert]
  );

  if (alertsAreLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MapContainer
        center={mapPosition}
        className={styles.map}
        minZoom={13}
        maxBounds={MAP_MAX_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        zoom={DEFAULT_ZOOM}
      >
        <ChangeCenter position={mapPosition} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // each "url" has a different theme, here are some I like
          // url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          url="https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png"
        />
        {focusedAlert && focusedAlert.location ? (
          <MapMarker
            alertItem={focusedAlert}
            focused={getFocused(focusedAlert)}
            onClick={() =>
              navigate(
                `${focusedAlert.post_id}?lat=${focusedAlert.location.latitude}&lng=${focusedAlert.location.longitude}`
              )
            }
          />
        ) : (
          sortedList?.map(
            (alertItem) =>
              alertItem.location && (
                <MapMarker
                  alertItem={alertItem}
                  focused={getFocused(alertItem)}
                  key={alertItem._id}
                  onClick={() =>
                    navigate(
                      `${alertItem.post_id}?lat=${alertItem.location.latitude}&lng=${alertItem.location.longitude}`
                    )
                  }
                  onClickOutsideMarker={onMarkerClick}
                />
              )
          )
        )}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.flyTo(position);
  return null;
}

export default Map;
