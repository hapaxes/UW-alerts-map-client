import { useEffect } from "react";
import styles from "./AlertPostContent.module.css";
function AlertPostContent({ contentHtml, title, uploadDate, url }) {
  const formattedUploadDate = new Date(uploadDate).toLocaleString();
  const longTitle = title?.length > 30;

  // const formattedUpdateDate = new Date(updateDate).toLocaleString();

  useEffect(function () {
    const links = document.querySelectorAll(`.${styles.postContent} a`);

    // Add target="_blank" to each link
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.classList.add(styles.postContentLink);
    });
  }, []);

  return (
    <>
      <div className={styles.postHeader}>
        <a target="_blank" href={url} className={styles.titleLink}>
          <h2 className={`${longTitle ? styles.longTitle : styles.shortTitle}`}>
            {title}
          </h2>
        </a>
        <p className={styles.uploadDate}>
          {formattedUploadDate && "Originally posted on: "}
          <time dateTime={formattedUploadDate}>{formattedUploadDate}</time>
        </p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: contentHtml }}
        className={styles.postContent}
      />
      <footer className={styles.footer}>
        <div className={styles.footerText}>
          {/* The post information and map location is auto-retrieved and may
                be inaccurate. Verify details at [source link]. */}
          This post was automatically retrieved and may contain errors. Please
          verify the details from{" "}
          <span>
            <a className={styles.footerLink} href={url} target="_blank">
              original post
            </a>
          </span>
          . The mapped location may also be inaccurate.
        </div>
      </footer>
    </>
  );
}

export default AlertPostContent;
