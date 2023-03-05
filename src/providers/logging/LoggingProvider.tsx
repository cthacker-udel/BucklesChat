import React, { type ReactNode } from "react";
import axios from "axos";

type LoggingProviderProperties = {
    children: ReactNode;
};

export const LoggingProvider = ({
    children,
}: LoggingProviderProperties): JSX.Element => {};
