/* eslint-disable @typescript-eslint/no-redundant-type-constituents -- any */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */

import type { ApiError } from "./ApiError";

export type ApiResponse<T = any> = {
    data: T;
    apiError?: ApiError;
    id?: number;
};
