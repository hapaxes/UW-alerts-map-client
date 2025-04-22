import styles from "./AboutSidebar.module.css";

function AboutSidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.items}>
        <li>
          <a href="#motivation-for-app">Motivation for App</a>
        </li>

        <li>
          <a href="#how-i-built-this-overview">How I built this (TLDR)</a>
        </li>
        <li>
          <a href="#how-i-built-this">How I built this</a>
        </li>
        <ul className={styles.indentedItems}>
          <li>
            <a href="#web-scraping">Web scraping </a>
          </li>
          <li>
            <a href="#frontend">Frontend</a>
          </li>
          <li>
            <a href="#server">Server</a>
          </li>
          {/* <li>
            <a href="#persistent-script">Persistent Script</a>
          </li> */}
        </ul>
        <li>
          <a href="#reflection">Reflection</a>
        </li>
        <li>
          <a href="#next-steps">Next Steps</a>
        </li>
        <li>
          <a href="#resources">Resources</a>
        </li>
      </ul>
    </aside>
  );
}

export default AboutSidebar;
