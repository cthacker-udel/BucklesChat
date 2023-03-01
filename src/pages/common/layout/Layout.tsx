import { useRouter } from "next/router";
import React, { ReactElement, ReactNode } from "react";

import styles from "./Layout.module.css";

type LayoutProperties = {
  children: ReactElement;
  styleOverride?: string;
};

export const Layout = ({
  children,
  styleOverride,
}: LayoutProperties): JSX.Element => {
  return <div className={`${styles.layout} ${styleOverride}`}>{children}</div>;
};
