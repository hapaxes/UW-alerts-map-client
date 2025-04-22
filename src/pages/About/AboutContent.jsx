import styles from "./AboutContent.module.css";
import sampleUwAlert from "../../assets/sample_UW_alert.png";
import uwAlertScrapingDiagram from "../../assets/UW_alert_scraping_diagram.png";

function AboutContent() {
  return (
    <div className={styles.contentContainer}>
      <main className="main-content">
        <div className={styles.title}>
          <h1>University District Alerts Map</h1>
          <p className="author">March, 2025</p>
        </div>
        <section id="motivation-for-app">
          <h2>Motivation for App</h2>
          <p>
            As a student at the University of Washington, I am able to receive
            email and text notifications from the university about incidents
            that happen on and near campus, through{" "}
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
            <label className={styles.imgLabel} htmlFor="sample_Uw_alert">
              An example UW alert, based off of
              <span>
                {" "}
                <a
                  target="_blank"
                  href="https://emergency.uw.edu/2023/09/03/uw-alert-3/"
                >
                  this post.
                </a>
              </span>
            </label>
          </div>
          <div>
            <p>
              I have a very poor sense of locations based off of street names,
              so I would have no idea where alerts (like the one on the left)
              occurred. Turns out that this incident occurred a few blocks from
              my apartment... yikes.
            </p>
            <p>
              Wouldn't it be easier if each alert came with a link to where the
              incident occurred, on a map app? Or perhaps the alerts webpage
              itself could have an embedded map, with incidents mapped out? Or,
              perhaps I could build this!
            </p>
          </div>
        </section>
        <div className={styles.divider}></div>
        <section id="how-i-built-this-overview">
          <h2>How I built this project (TLDR)</h2>
          <p>
            I first scraped the UW alerts page for all alerts ever posted on the
            blog. Each alert was put through an AI model to extract the address
            of where incidents occured, and the category of each post. Each post
            was then saved on MongoDB
          </p>
          <p>
            The frontend is created using React.js. with an Express.js server as
            the backend
          </p>
          <p>
            I deployed a script that runs every hour that checks the UW alerts
            website for new posts. If new alerts are found, they are distilled
            and categorized and saved to MongoDB.
          </p>
        </section>
        <div className={styles.divider}></div>
        <section id="how-i-built-this">
          <h2>How I built this project:</h2>
          <p className={styles.howLinksDescription}>
            Each link in this section links to it's respective code on GitHub.
          </p>
          <h3 id="web-scraping">
            Web Scraping{" "}
            <span>
              <a
                className={styles.aboutHeaderRepoLink}
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-scripts"
              >
                <h4>GitHub repo</h4>
              </a>
            </span>
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
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-scripts/blob/master/initialDataScrape.js"
              >
                Puppeteer
              </a>
            </span>
            . Each post was distilled into it's title, url, upload date and
            post-id. I then queried{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-scripts/blob/master/gemini.cjs"
              >
                Google Gemini
              </a>
            </span>
            , a Chat-Gpt like AI, to ask it to put the post in some category
            (Crime, Weather, IT, etc.). I additionally queried Gemini for the
            address where the incident initially occurred. If an address
            existed, I queried the
            <span>
              {" "}
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-scripts/blob/master/googleMapsApi.cjs"
              >
                Google Maps API
              </a>
            </span>{" "}
            for it's latitude and longitude. I then stored each derived JSON
            into{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-scripts/blob/master/initialDataScrape.js"
              >
                MongoDB
              </a>
            </span>
            .
          </p>
          <h4 style={{ width: "100%", marginBottom: "0.5rem" }}>
            Web Scraping - diagram
          </h4>
          <div className={styles.diagramContainer}>
            <img
              className={styles.diagram}
              id="diagram"
              src={uwAlertScrapingDiagram}
            />
            <label className={styles.imgLabel} htmlFor="diagram">
              Diagram showing where "url", "title", and "date" was scraped from.
              "Categories" and "location" first went through the gemeni and
              googlemaps api. Content scraped from{" "}
              <span>
                <a
                  target="_blank"
                  href="https://emergency.uw.edu/2025/02/26/shooting-at-ne-47th-st-u-way-ne/"
                >
                  this post.
                </a>
              </span>
            </label>
          </div>
          <h3 id="frontend" style={{ width: "100%" }}>
            Frontend - React.js{" "}
            <span>
              <a
                className={styles.aboutHeaderRepoLink}
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client"
              >
                <h4>GitHub repo</h4>
              </a>
            </span>
          </h3>
          <p>
            The frontend, built using{" "}
            <span>
              <a target="_blank" href="https://react.dev/">
                React.js
              </a>
            </span>
            , serves as the interactive interface for visualizing UW Alert data.
            It received a list of structured JSON of each alert. When an alert
            is focused, the HTML associated with the post is fetched. Using{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/components/Map/Map.jsx"
              >
                React Leaflet
              </a>
            </span>
            , each alert that has a location is dynamically rendered as a marker
            on an interactive map, allowing users to geographically understand
            the spread of these notifications. .
          </p>
          <p>
            State management (list of alerts, currently focused alert) is mainly
            handled using the{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/contexts/MapContext.jsx"
              >
                useContext
              </a>
            </span>{" "}
            React hook. I chose to use the useContext hook for it's ease of
            sharing simple state. The limited re-renders the web app requires,
            also made this a good choice, contributing to a smooth user
            experience. I additionally leveraged the{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/hooks/useMongo.js"
              >
                useReducer
              </a>
            </span>{" "}
            hook to batch state updates, and simplifying the code.
          </p>
          <p>
            Localstorage with time stamps was leveraged to reduce API calls
            while maintaining fresh data
          </p>
          <p>
            To manage navigation within the application, I implemented
            declarative routing using React router's
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/App.jsx"
              >
                {" "}
                BrowserRouter
              </a>
            </span>{" "}
            and{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/App.jsx"
              >
                Routes
              </a>
            </span>
            , defining clear paths for the main alert list, individual alert
            posts, and the about page.
          </p>
          <p>
            For styling management, I used{" "}
            <span>
              CSS Modules{" "}
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-client/blob/master/src/components/AlertItem/AlertItem.module.css"
              >
                (example)
              </a>
            </span>
            , ensuring component-level encapsulation and avoiding global style
            conflicts
          </p>

          <h3 id="server">
            {" "}
            Backend - Express.js{" "}
            <span>
              <a
                className={styles.aboutHeaderRepoLink}
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-server"
              >
                <h4>GitHub repo</h4>
              </a>
            </span>
          </h3>
          <p>
            The server uses{" "}
            <span>
              <a
                target="_blank"
                href="https://github.com/hapaxes/UW-alerts-map-server/blob/main/src/index.js"
              >
                Express.js
              </a>
            </span>{" "}
            to create a simple API. It connects to a MongoDB database to
            retrieve data. The API has two main routes: one to list summaries of
            posts and another to fetch the HTML content of a specific post,
            which it then sanitizes to prevent potential security issues (and
            formatting issues on the frontend). The server also implements basic
            security measures like rate limiting and some HTTP header
            configurations.
          </p>

          {/* <h3 id="persistent-script">Persistent Script</h3>
          <p>
            A script checks the UW Alerts website every hour for new posts. If a
            new post is published, the post is distilled into a JSON object of
            relevant information. A final email is sent to me for category and
            address verification (AI's can and do make mistakes).
          </p> */}
        </section>

        <div className={styles.divider}></div>

        <section id="reflection">
          <h2>Reflection</h2>
          <p>
            This was very fun to put together :) I enjoyed applying things I've
            learnt from my react course to a personal project.{" "}
          </p>
          <div>
            Some things I thought about through building this project (and want
            to learn about).
            <ul className={styles.list}>
              <li>
                Server Development (creating servers that are able to handle
                (much) greater traffic and queries)
              </li>
              <li>
                How the internet works in detail (What actually happens when I
                .fetch{"({ ... })"}? What is HTTP?)
              </li>
              <li>CSS reusability</li>
              <li>Design principles (creating aesthetic apps)</li>
              <li>TypeScript</li>
            </ul>
          </div>
        </section>

        <div className={styles.divider}></div>

        <section id="next-steps">
          <h2>Next Steps</h2>
          <h3 style={{ width: "100%" }}>Immediate next steps</h3>
          <ul className={styles.list}>
            <li>
              Continue with React course -{" "}
              <a
                target="_blank"
                href="https://www.udemy.com/course/the-ultimate-react-course/?srsltid=AfmBOoqSRSV1AW9ReyCSEBRP4F7zaOc0V_lpwl2G8LknoEqV9ry2GDUN"
              >
                The Ultimate React Course 2025: React, Next.js, Redux & More{" "}
              </a>{" "}
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
              <span>In depth JavaScript course ➡️ </span>
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
            <li>Learn about HTTP, TCP/IP, Web Browsers</li>
          </ul>
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
