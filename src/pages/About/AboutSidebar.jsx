import styles from "./AboutSidebar.module.css";

function AboutSidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul className={styles.items}>
        <li>
          <a href="#motivation-for-app">Motivation for App</a>
        </li>
        <li>
          <a href="#how-i-built-this-(TLDR)">How I built this (TLDR)</a>
        </li>
        <li>How I built this (in depth)</li>
        <ol>
          <li>Building </li>
          <li>Web scraping</li>
          <li>Building of app</li>
          <li>Script</li>
        </ol>
        <li>Next steps</li>
      </ul>
    </aside>
  );
}

export default AboutSidebar;
