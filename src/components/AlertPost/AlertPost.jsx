import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMapContext } from "../../contexts/MapContext";

import AlertPostContent from "../AlertPostContent/AlertPostContent";
import AlertPostNav from "../AlertPostNav/AlertPostNav";
import BackButton from "../BackButton/BackButton";
import Loader from "../Loader/Loader";

import styles from "./AlertPost.module.css";

function AlertPost() {
  /**
   * get the post html from useMongo;
   * if it's rendering, load the loader.
   * otherwise, return the html
   *
   * format the post nicely!
   */
  const { post_id } = useParams();
  const {
    focusedAlertHtmlObjIsLoading,
    focusedAlertHtmlObj,
    getPostHtml,
    error,
  } = useMapContext();

  const contentHtml = focusedAlertHtmlObj?.cleanedContentHtml;
  const title = focusedAlertHtmlObj?.title;
  const updateDate = focusedAlertHtmlObj?.date?.update_date;
  const uploadDate = focusedAlertHtmlObj?.date?.upload_date;
  const url = focusedAlertHtmlObj?.url;

  // console.log(contentHtml, title, updateDate, uploadDate, url);

  useEffect(
    function () {
      getPostHtml(post_id);
    },
    [post_id]
  );

  if (error) {
    return (
      <>
        <div className={styles.backcontainer}>
          <BackButton />
        </div>
        <div className={styles.error}>
          <div className={styles.errorMessage}>{error}</div>
          <div>this page doesn't exist...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <AlertPostNav post_id={post_id} />
      <div key={post_id} className={styles.container}>
        {focusedAlertHtmlObjIsLoading ? (
          <Loader />
        ) : (
          <>
            <AlertPostContent
              contentHtml={contentHtml}
              title={title}
              updateDate={updateDate}
              uploadDate={uploadDate}
              url={url}
            />
          </>
        )}
      </div>
    </>
  );
}

export default AlertPost;
