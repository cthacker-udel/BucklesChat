/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */

import type { ApiError } from "./ApiError";

export type ApiResponse<T = any> = {
    apiError?: ApiError;
    data: T;
    id?: number;
};
