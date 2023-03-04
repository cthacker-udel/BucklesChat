import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import type { User } from "@/@types";
import { Endpoints } from "@/assets";

/**
 * Attempts to add an user to the database
 *
 * @param request - The client-side request
 * @param response - The client-side response
 */
const addUserHandler = async (
    request: NextApiRequest,
    response: NextApiResponse,
): Promise<void> => {
    const body = request.body as Partial<User>;

    if (process.env.SERVICE_URL === undefined) {
        response.status(400);
    } else {
        const postResult = await axios.post(
            `${process.env.SERVICE_URL}${Endpoints.USER.BASE}${Endpoints.USER.CREATE}`,
            body,
        );
        console.log(postResult);
    }
};

export { addUserHandler as default };
