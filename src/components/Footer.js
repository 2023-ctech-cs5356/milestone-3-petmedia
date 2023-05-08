// import from react
import React from "react";

// import css style 
import styles from "./Footer.module.css";

const Footer = () => {
  const socialIcons = () => {
    // Implement the logic to render social icons
    return <div className="w3social-icons footer-w3icons"></div>;
  };

  return (
    <div className={styles.footerBackground}>
      <div className="container">
        {socialIcons()}
        <p className={styles.footerText}>
          © Pet Media. All Rights Reserved | Designed by Katherine, Kai, Ethan
        </p>
      </div>
    </div>
  );
};

export default Footer;




