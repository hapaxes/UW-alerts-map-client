import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { useMapContext } from "../../contexts/MapContext";
import Loader from "../Loader/Loader";
import styles from "./AlertPost.module.css";
import AlertPostNav from "../AlertPostNav/AlertPostNav";
import BackButton from "../BackButton/BackButton";
import AlertPostContent from "../AlertPostContent/AlertPostContent";

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

/**THIS IS A POTENTIAL SOLUTION, FROM CHATGPT, BUT FOR NOW,
 * I THNK IT'S BETTER TO TRY TO IMPROVE THE SCRAPING PROCESS
 * 
 * const CleanDiv = ({ content }) => {
  // Function to remove text content from the div but keep tags
  const cleanTextContent = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    
    // Iterate through child nodes and remove text nodes
    div.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });
    
    return div.innerHTML; // Return cleaned HTML with tags intact
  };

  return (
    <div dangerouslySetInnerHTML={{ __html: cleanTextContent(content) }} />
  );
};

 */

/**
when I scrape the data, maybe it's better to save more parts
of the data, liek the link
the upload date, the update date,
so that I can have more control over how I display the content

I think the main post is just what it is
but at least the header with the title
link etc is something I want more control over.
 */
