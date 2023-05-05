import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const socialIcons = () => {
    // Implement the logic to render social icons
    return <div className="w3social-icons footer-w3icons"></div>;
  };

  return (
    <div className={styles.footer}>
      <div className="container">
        {socialIcons()}
        <p className={styles.footerContent}>
          © Pet Media. All Rights Reserved | Designed by Katherine, Kai, Ethan
        </p>
      </div>
    </div>
  );
};

export default Footer;




