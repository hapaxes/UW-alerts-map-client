import { useEffect, useReducer } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STORED_LIST_MAX_AGE = 1000 * 60 * 60; // 1 hour

const initialState = {
  alertsList: [],
  alertsAreLoading: false,
  focusedAlert: {},
  focusedAlertHtmlObj: null,
  focusedAlertHtmlObjIsLoading: false,
  sortedList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "alerts/loading":
      return { ...state, alertsAreLoading: true };
    case "alerts/loaded":
      return {
        ...state,
        alertsAreLoading: false,
        alertsList: action.payload,
        sortedList: action.payload,
      };
    case "alerts/sorted":
      return { ...state, sortedList: action.payload };
    case "alerts/rejected":
      return {
        ...state,
        alertsAreLoading: false,
        alertsList: [],
        error: action.payload,
      };
    case "alertPost/loading":
      return {
        ...state,
        error: "",
        focusedAlert: state.alertsList.find(
          (alertItem) => alertItem.post_id === action.payload
        ),
        focusedAlertHtmlObj: null,
        focusedAlertHtmlObjIsLoading: true,
      };
    case "alertPost/loaded":
      return {
        ...state,
        error: "",
        focusedAlertHtmlObjIsLoading: false,
        focusedAlertHtmlObj: action.payload.data,
      };
    case "alertPost/rejected":
      return {
        ...state,
        focusedAlert: {},
        focusedAlertHtmlObjIsLoading: false,
        error: action.payload,
      };
    case "alertPost/unfocused":
      return {
        ...state,
        error: "",
        focusedAlert: {},
        focusedAlertHtmlObj: null,
      };
    default:
      throw new Error(`Unrecognized reducer request ${action}`);
  }
}

function useMongo() {
  const [
    {
      alertsAreLoading,
      alertsList,
      error,
      focusedAlert,
      focusedAlertHtmlObj,
      focusedAlertHtmlObjIsLoading,
      sortedList,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  function unfocusPost() {
    dispatch({ type: "alertPost/unfocused" });
  }

  function setSortedList(sortedList) {
    dispatch({ type: "alerts/sorted", payload: sortedList });
  }

  function setAlertPostLoading(post_id) {
    dispatch({ type: "alertPost/loading", payload: post_id });
  }

  function setAlertsListLoading() {
    dispatch({ type: "alerts/loading" });
  }

  // initial data fetch when component mounts
  useEffect(function () {
    async function initialDataFetch() {
      try {
        dispatch({ type: "alerts/loading" });
        const response = await fetch(`${BASE_URL}/api/list`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const result = await response.json();

        // newer posts first
        result.sort(
          (a, b) => new Date(b.date.upload_date) - new Date(a.date.upload_date)
        );
        dispatch({ type: "alerts/loaded", payload: result });
        localStorage.setItem(
          "alertsList",
          JSON.stringify({
            value: result,
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        dispatch({
          type: "alerts/rejected",
          payload: "There was an error loading Alerts, " + e.message,
        });
      }
    }
    const storedAlertsList = localStorage.getItem("alertsList");
    if (storedAlertsList) {
      const listObj = JSON.parse(storedAlertsList);
      const list = listObj.value;
      const timestamp = new Date(listObj.timestamp);

      // if the data is older than 1 hr, refresh
      if (Date.now() - timestamp > STORED_LIST_MAX_AGE) {
        initialDataFetch();
      } else {
        dispatch({ type: "alerts/loaded", payload: list });
      }
    } else {
      initialDataFetch();
    }
  }, []);

  async function getPostHtml(post_id) {
    try {
      dispatch({ type: "alertPost/loading", payload: post_id });
      const response = await fetch(`${BASE_URL}/api/get-html`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id }), // Sending the ID in the request body
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const result = await response.json();

      dispatch({
        type: "alertPost/loaded",
        payload: {
          data: result.data,
        },
      });
    } catch (e) {
      dispatch({
        type: "alertPost/rejected",
        payload: e.message,
      });
    }
  }

  return {
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
  };
}

export default useMongo;

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
