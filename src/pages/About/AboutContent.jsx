import styles from "./AboutContent.module.css";
import sampleUwAlert from "../../assets/sample_UW_alert.png";
import uwAlertScrapingExample from "../../assets/UW_alert_scraping_example.png";
import uwAlertScrapingDiagram from "../../assets/UW_alert_scraping_diagram.png";

function AboutContent() {
  return (
    <div className={styles.contentContainer}>
      <main className="main-content">
        <h1>University District Alerts Map</h1>
        <p className="author">March, 2025</p>
        <section id="motivation-for-app">
          <h2>Motivation for App</h2>
          <p>
            As a student at the University of Washington, I am able to receive
            email and text notifications from the university about things that
            happen on and near campus, through{" "}
            <span>
              <a target="_blank" href="https://emergency.uw.edu/">
                UW Alerts
              </a>
            </span>
            . Alerts include information about crimes, power outages, IT
            notifications etc.
          </p>
          <div className={styles.imgContainer}>
            <img
              id="sample_Uw_alert"
              className={styles.sampleUwAlert}
              src={sampleUwAlert}
            />{" "}
            <label htmlFor="sample_Uw_alert">
              An example UW alert, based off of
              <span>
                {" "}
                <a
                  target="_blank"
                  href="https://emergency.uw.edu/2023/09/03/uw-alert-3/"
                >
                  this post
                </a>
              </span>
            </label>
          </div>
          <div>
            <p>
              When I looked at UW Alert notifications, I often wouldn't know
              where these incidents occured because I have terrible street name
              awareness. So notifications (like the one on the left) (SOMETHING
              ABOUT THE IMPACT OF THE POST NOT FEELING THAT LARGE)
            </p>
            <p>
              I looked up "4300 block of Brookly Ave. NE" on a map, and was very
              surprised to see it was just a few blocks from my apartment.
            </p>
            <p>
              I then had the idea of mapping each alert to a location onto a
              map, to make it easier to understand where incident occur would
            </p>
          </div>
        </section>
        <div className={styles.divider}></div>
        <section id="how-i-built-this">
          <h2>Building Process</h2>
          <h3 id="web-scraping" style={{ width: "100%" }}>
            Web Scraping
          </h3>
          <p>
            I first scraped all UW alerts that had been published on{" "}
            <span>
              <a target="_blank" href="https://emergency.uw.edu">
                UW Alerts
              </a>
            </span>{" "}
            using{" "}
            <span>
              <a target="_blank" href="https://pptr.dev/">
                Puppeteer
              </a>
            </span>
            . Each post was distilled into it's title, url, upload date and
            post-id. Then, I queried{" "}
            <span>
              <a target="_blank" href="https://gemini.google.com/app">
                Google Gemini
              </a>
            </span>
            , a Chat-Gpt like AI, for the address associated with each post (For
            example, some posts are just general IT notifications, and don't
            have associated addresses), and the categories associated with each
            post. If an address existed, I determined the latitude and longitude
            through the{" "}
            <span>
              <a
                target="_blank"
                href="https://developers.google.com/maps/documentation/geolocation/overview"
              >
                Google Maps API
              </a>
            </span>{" "}
            . Each post and post HTML was then stored in a{" "}
            <span>
              <a target="_blank" href="https://mongodb.com">
                MongoDB
              </a>
            </span>{" "}
            database.
          </p>
          <h4 style={{ width: "100%", marginBottom: "0.5rem" }}>
            Web Scraping - Pseudocode
          </h4>
          <div className={styles.pseudocode}>
            <p>// while there is a next post</p>
            <p>
              //
              <span style={{ marginLeft: "2rem" }}>
                get the text content of the current post
              </span>
            </p>
            <p>
              //
              <span style={{ marginLeft: "2rem" }}>
                extract title, URL, post ID, and upload date from the text
              </span>
            </p>
            <p>
              //
              <span style={{ marginLeft: "2rem" }}>
                check if the post text contains a location
              </span>
            </p>
            <p>
              //
              <span style={{ marginLeft: "2rem" }}>
                geolocate the location mentioned in the post
              </span>
            </p>
            <p>
              //
              <span style={{ marginLeft: "4rem" }}>
                store the post data (including location if found)
              </span>
            </p>
            <p>
              //
              <span style={{ marginLeft: "2rem" }}>move to the next post </span>
            </p>
          </div>
          <h3 style={{ width: "100%" }}>Frontend - React.js</h3>
          <p>
            The frontend, built using{" "}
            <span>
              <a target="_blank" href="https://react.dev/">
                React.js
              </a>
            </span>
            , serves as the interactive interface for visualizing UW Alert data.
            It receives structured JSON original HTML content from the backend
            server. Using React Leaflet, each alert with location data is
            dynamically rendered as a marker on an interactive map, allowing
            users to geographically understand the spread of these
            notifications.
            <span>
              <a target="_blank" href="https://leafletjs.com/">
                React Leaflet
              </a>
            </span>
            .
          </p>
          <p>
            State management of shared state (list of alerts, currently focused
            alert) is mainly handled using the{" "}
            <span>
              <a
                target="_blank"
                href="https://react.dev/reference/react/useContext"
              >
                useContext
              </a>
            </span>{" "}
            React hook. I chose to use the useContext hook for it's ease of
            sharing simple state, and the limited re-renders the web app
            requires, contributing to a smooth user experience. I additionally
            leveraged the{" "}
            <span>
              <a
                target="_blank"
                href="https://react.dev/reference/react/useReducer"
              >
                useReducer
              </a>
            </span>{" "}
            hook to batch state updates, simplifying the code.
          </p>
          <p>
            To manage navigation within the application, I implemented
            declarative routing using <a>React Router's</a>
            <span>
              <a> BrowserRouter</a>
            </span>{" "}
            and{" "}
            <span>
              <a>Routes</a>
            </span>
            , defining clear paths for the main alert list, individual alert
            posts, and the about page.
          </p>
          <p>
            For styling management, I used{" "}
            <span>
              <a>CSS Modules</a>
            </span>
            , ensuring component-level encapsulation and avoiding global style
            conflicts
          </p>

          <h3>Server</h3>

          <p>
            . The server is hosted using{" "}
            <span>
              <a target="_blank" href="https://render.com/">
                Render
              </a>
              , and the frontend is hosted using{" "}
              <span>
                <a>WHAT IS THE FRONTEND HOSTED THROUGH BRO?</a>
              </span>
            </span>
          </p>
          <p>
            A script checks the UW Alerts website every hour for new posts. If a
            new post is published, the post is distilled into it's pertinent
            information by the process above. A final email is sent to me for
            category and address verification (AI's can and do make mistakes).
          </p>
        </section>

        <div className={styles.divider}></div>

        <section id="resources">
          <h2>Resources I used</h2>
          <ul className={styles.list}>
            <li>
              <a
                target="_blank"
                href="https://www.udemy.com/course/the-ultimate-react-course/?srsltid=AfmBOoqSRSV1AW9ReyCSEBRP4F7zaOc0V_lpwl2G8LknoEqV9ry2GDUN"
              >
                The Ultimate React Course 2025: React, Next.js, Redux & More{" "}
              </a>{" "}
            </li>
            <li>
              <a target="_blank" href="https://frontendmasters.com/">
                Frontend masters (React.js, HTML/CSS, JavaScript)
              </a>
            </li>
            <li>
              <a target="_blank" href="https://developer.mozilla.org/en-US/">
                MDN Web Docs
              </a>
            </li>
            <li>
              <a target="_blank" href="https://css-tricks.com/">
                CSS-Tricks
              </a>
            </li>
            <li>
              <a target="_blank" href="https://chatgpt.com">
                Chat-Gpt
              </a>
            </li>
          </ul>
        </section>

        <div className={styles.divider}></div>

        <section id="next-steps">
          <h2>Next Steps</h2>
          <h3 style={{ width: "100%" }}>Immediate next steps</h3>
          <ul className={styles.list}>
            <li>
              Complete{" "}
              <a
                target="_blank"
                href="https://www.udemy.com/course/the-ultimate-react-course/?srsltid=AfmBOoqSRSV1AW9ReyCSEBRP4F7zaOc0V_lpwl2G8LknoEqV9ry2GDUN"
              >
                The Ultimate React Course 2025: React, Next.js, Redux & More{" "}
              </a>{" "}
              (52% completed)
            </li>
          </ul>
          <h3 style={{ width: "100%" }}>Eventual next steps</h3>
          <ul className={styles.list}>
            <li>
              Express, Node.js course ➡️{" "}
              <span>
                <a
                  target="_blank"
                  href="https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/"
                >
                  Node.js, Express, MongoDB & More: The Complete Bootcamp
                </a>
              </span>
            </li>
            <li>
              In depth JavaScript course ➡️{" "}
              <span>
                <a
                  target="_blank"
                  href="https://frontendmasters.com/courses/javascript-hard-parts-v2/"
                >
                  FrontendMasters JavaScript-hard-parts
                </a>
                ,
              </span>
            </li>
            <li>
              {" "}
              In depth JavaScript course ➡️{" "}
              <a
                target="_blank"
                href="https://frontendmasters.com/courses/deep-javascript-v3/"
              >
                FrontendMasters Deep-JavaScript
              </a>
            </li>
            <li>
              Website accessibility ➡️{" "}
              <a
                target="_blank"
                href="https://frontendmasters.com/courses/accessibility-v3/"
              >
                FrontendMasters Website Accessibility
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AboutContent;

// there rae
// there
// there are
