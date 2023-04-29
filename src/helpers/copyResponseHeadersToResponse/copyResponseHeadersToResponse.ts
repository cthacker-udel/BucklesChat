import type { NextApiResponse } from "next";

/**
 * Copies over the headers from the server response to the client response
 *
 * @param response - The server response
 * @param nextResponse - The client response
 */
export const copyResponseHeadersToResponse = (
    response: Response,
    nextResponse: NextApiResponse,
): void => {
    if (response.status < 400) {
        for (const [headerKey, headerValue] of response.headers) {
            nextResponse.appendHeader(headerKey, headerValue);
        }
    }
};
