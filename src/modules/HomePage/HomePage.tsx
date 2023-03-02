import { TextConstants } from "@/assets/str/TextConstants";
import React from "react";
import styles from "./HomePage.module.css";

import Background from "@/assets/background/homepage/bg.gif";
import { useBackground } from "@/hooks/useBackground";
import { Button } from "react-bootstrap";

export const HomePage = (): JSX.Element => {
  useBackground(Background, { backgroundOpacity: 0.75 });

  return (
    <div className={styles.home_page_content}>
      <div className={styles.home_page_welcome_text}>
        <div className={styles.home_page_title}>
          {TextConstants.HOME_PAGE.TITLE}
        </div>
        <div className={styles.home_page_description}>
          {TextConstants.HOME_PAGE.DESCRIPTION}
        </div>
      </div>
      <div className={styles.home_page_option_buttons}>
        <Button variant="primary">
          {TextConstants.HOME_PAGE.BUTTON_1_TEXT}
        </Button>
        <Button variant="success">
          {TextConstants.HOME_PAGE.BUTTON_2_TEXT}
        </Button>
      </div>
    </div>
  );
};
