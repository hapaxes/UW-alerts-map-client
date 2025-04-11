import AboutContent from "./AboutContent";
import AboutHeader from "./AboutHeader";
import AboutSidebar from "./AboutSidebar";
import styles from "./About.module.css";
import Navbar from "../../components/Navbar/Navbar";

function About() {
  return (
    <div className={styles.pageContainer}>
      <div id="top" className={styles.top}></div>
      <Navbar loader={false} gridArea={"header"} />
      <AboutSidebar />
      <AboutContent />
      <div className={styles.toTop}>
        <a href="#top">
          <svg
            className={styles.arrow}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="#e4d5b2"
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            />
          </svg>
          <div className={styles.arrowBackground}></div>
        </a>
      </div>
      <footer className={styles.footer}>
        <div>Created March 2025, 😊</div>
      </footer>
    </div>
  );
}

export default About;
