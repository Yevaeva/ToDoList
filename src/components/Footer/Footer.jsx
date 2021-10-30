import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faMusic } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.networks}>
        <a
          href="https://www.linkedin.com/in/yeva-terteryan-05a47176/"
          rel="noreferrer noopener"
          target="_blank"
        >
          <FontAwesomeIcon size="2x" icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/Yevaeva?tab=repositories"
          rel="noreferrer noopener"
          target="_blank"
        >
          <FontAwesomeIcon size="2x" icon={faGithub} />
        </a>
        <a
          href="https://codepen.io/yevaeva/pens/public"
          rel="noreferrer noopener"
          target="_blank"
        >
          <FontAwesomeIcon size="2x" icon={faCodepen} />
        </a>
      </div>
      <div className={styles.about}>
        <p>
          Made with <FontAwesomeIcon icon={faCoffee} /> and{" "}
          <FontAwesomeIcon icon={faMusic} /> by <u>YEva Terteryan</u>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
