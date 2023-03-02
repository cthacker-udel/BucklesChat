import { useBackground } from "@/hooks/useBackground";
import React from "react";
import Background from "@/assets/background/signup/bg.gif";

import styles from "./SignUp.module.css";
import { TextConstants } from "@/assets/str/TextConstants";

/**
 *
 * @returns
 */
export const SignUp = (): JSX.Element => {
  useBackground(Background);

  return (
    <div className={styles.sign_up_content}>
      <div className={styles.sign_up_header}>{TextConstants.SIGN_UP.TITLE}</div>
    </div>
  );
};
