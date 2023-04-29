import type { NextApiResponse } from "next";

/**
 * Copies the server response to the client response
 *
 * @param response - The sever response
 * @param apiResponse - The client response
 */
export const copyResponseStatusToResponse = (
    response: Response,
    apiResponse: NextApiResponse,
): void => {
    apiResponse.status(response.status);
};
