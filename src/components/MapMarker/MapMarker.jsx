import React from "react";
import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MapMarker.module.css";
import { useMapContext } from "../../contexts/MapContext";

const MapMarker = React.memo(function MapMarker({
  alertItem,
  focused,
  onClick,
}) {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const { unfocusPost } = useMapContext();
  const map = useMap();
  const { location, categories } = alertItem;
  const position = [location.latitude, location.longitude];

  function handleClick() {
    onClick();
  }

  function handleXClick() {
    navigate("/list");
  }

  // open the marker popup if marker is focused by clicking on AlertItem from
  // AlertsList
  useEffect(
    function () {
      const popupElement = popupRef.current;
      if (focused) {
        popupElement
          .setLatLng([location.latitude, location.longitude])
          .openOn(map);
      }
    },

    [focused, map, location]
  );

  function createMarkerIcon({ r, g, b }) {
    const opacity = "1";

    // here's another "map marker" svg theme I tried

    // const svgString = encodeURIComponent(`
    //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 598">
    //     <path fill="rgba(${r},${g},${b},${opacity})" stroke="rgba(0,0,0,${opacity})" stroke-width="20" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
    //   </svg>
    // `);

    // leaflet api expects an URI encoded svg string
    const svgString = encodeURIComponent(`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="2 2 19 19"
        fill="none"
      >
        <path
          fill="rgba(${r},${g},${b},${opacity})"
          stroke="rgba(0,0,0,${opacity})"
          stroke-width="0.8"
          fill-rule="evenodd"
          d="M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          clip-rule="evenodd"
        />
      </svg>`);

    return L.icon({
      iconUrl: `data:image/svg+xml,${svgString}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [0, 0],
    });
  }

  return (
    <Marker
      eventHandlers={{ click: handleClick }}
      icon={createMarkerIcon(getColorFromCategory(categories))}
      position={position}
    >
      <Popup
        ref={popupRef}
        // eventHandlers={{
        //   remove: () => navigate("/list"),
        // }}
      >
        <div className={styles.popupContentContainer}>
          <h2>{alertItem.title}</h2>
          <p className={styles.categories}>{alertItem.categories.join(", ")}</p>
        </div>
        <div className={styles.x} onClick={handleXClick}>
          &times;
        </div>
      </Popup>
    </Marker>
  );
});

function getColorFromCategory(_categories) {
  const categories = [..._categories].map((category) => category.toLowerCase());
  if (categories.includes("crime")) {
    // --uw-red
    // "rgb(155, 11, 11)";
    return { r: 155, g: 11, b: 11 };
  }

  if (categories.includes("general")) {
    // --uw-gray
    // rgb(102, 102, 102);
    return { r: 110, g: 110, b: 110 };
  }

  const category = categories[0];
  switch (category) {
    case "administrative":
      // "rgb(255, 172, 37)";
      return { r: 255, g: 172, b: 37 };

    case "environment":
      // "rgb(0, 56, 8)";
      return { r: 0, g: 56, b: 8 };

    case "facility":
      // "rgb(0, 119, 255)";
      return { r: 0, g: 0, b: 0 };

    case "health & wellness":
      // "rgb(255, 179, 1)";
      return { r: 255, g: 179, b: 1 };

    case "infrastructure":
      // "rgb(68, 68, 68)";
      return { r: 68, g: 68, b: 68 };

    case "IT":
      // "rgb(148, 214, 255)8)";
      return { r: 148, g: 214, b: 255 };

    case "traffic":
      // "rgb(131, 109, 49)8)";
      return { r: 131, g: 109, b: 49 };

    case "weather":
      // "rgb(135, 255, 143)";
      return { r: 135, g: 255, b: 140 };

    case "Hazardous materials":
      // rgb(0, 114, 38);
      return { r: 0, g: 114, b: 38 };

    case "fire":
      // rgb(167, 0, 0);
      return { r: 167, g: 0, b: 0 };

    case "academic":
    default:
      // "rgba(51, 0, 111,1)";
      return { r: 51, g: 0, b: 111 };
  }
}

export default MapMarker;
