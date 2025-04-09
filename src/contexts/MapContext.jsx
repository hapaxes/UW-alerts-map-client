import { createContext, useContext } from "react";
import useMongo from "../hooks/useMongo";

const MapContext = createContext({});

function MapProvider({ children }) {
  const {
    alertsAreLoading,
    alertsList,
    error,
    focusedAlert,
    focusedAlertHtmlObj,
    focusedAlertHtmlObjIsLoading,
    getPostHtml,
    setAlertPostLoading,
    setAlertsListLoading,
    setSortedList,

    sortedList,

    unfocusPost,
  } = useMongo();

  return (
    <MapContext.Provider
      value={{
        alertsAreLoading,
        alertsList,
        error,
        focusedAlert,
        focusedAlertHtmlObj,
        focusedAlertHtmlObjIsLoading,
        getPostHtml,
        setAlertPostLoading,
        setAlertsListLoading,
        setSortedList,
        sortedList,
        unfocusPost,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

function useMapContext() {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("MapContext was used outside of MapProvider");
  }
  return context;
}

export { MapProvider, useMapContext };
