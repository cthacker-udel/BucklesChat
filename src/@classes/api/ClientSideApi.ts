/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

/**
 * All client-side requests go through this interface, which interacts with the serverless api under the `pages` directory
 */
export class ClientSideApi {
    /**
     * The base url of this class, used to construct the endpoints efficiently
     */
    public static BASE_URL:
        | string
        | undefined = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;

    /**
     * Constructs the base url using the environment base url + api/ on the end
     */
    public constructor() {
        ClientSideApi.BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
    }

    /**
     * Sends a get request to the serverless api to then send the request to the server
     *
     * @param endpoint - The endpoint the user is calling
     * @param queryParameters - The query parameters that will be appended to the end of the url
     * @returns A promise of the return type specified in the call
     */
    public static async get<T>(
        endpoint: string,
        queryParameters?: { [key: string]: number | string },
    ): Promise<T> {
        const queryString = queryParameters
            ? `?${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";
        const getRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                credentials: "include",
                method: "GET",
                mode: "cors",
            },
        );

        const parsedResult = await getRequestResult.json();
        return parsedResult as T;
    }

    /**
     * Sends a post request to the serverless api to then send the request to the server
     *
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request, which is required (expected) in post requests
     * @param queryParameters - The query parameters which the user wants to append onto the url
     * @returns The response from the server
     */
    public static async post<T, K = { [key: string]: number | string }>(
        endpoint: string,
        body: K,
        queryParameters?: { [key: string]: number | string },
    ): Promise<T> {
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";
        const postRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                body: JSON.stringify(body ?? {}),
                credentials: "include",
                method: "POST",
                mode: "cors",
            },
        );

        const parsedPostRequest = await postRequestResult.json();

        return parsedPostRequest as T;
    }

    /**
     * Sends a delete request to the serverless api located under the `pages` directory
     *
     * @param endpoint - The endpoint the user is calling
     * @param queryParameters - The query parameters that are appended to the end of the url
     * @returns The response from the server
     */
    public static async delete<T>(
        endpoint: string,
        queryParameters?: { [key: string]: number | string },
    ): Promise<T> {
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";
        const deleteRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            { credentials: "include", method: "DELETE", mode: "cors" },
        );

        const parsedDeleteRequest = await deleteRequestResult.json();

        return parsedDeleteRequest as T;
    }

    /**
     * Sends a put request to the serverless api located under the `pages` directory
     *
     * @param endpoint - The endpoint the user is calling
     * @param body - The body of the request, which is required with put requests
     * @param queryParameters - The query parameters which are appended to the end of the url
     * @returns The response from the server
     */
    public static async put<T, K = { [key: string]: number | string }>(
        endpoint: string,
        body?: K,
        queryParameters?: { [key: string]: number | string },
    ): Promise<T> {
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";
        const putRequestResult = await fetch(
            `${this.BASE_URL}${endpoint}${queryString}`,
            {
                body: JSON.stringify(body ?? {}),
                credentials: "include",
                method: "PUT",
                mode: "cors",
            },
        );

        const parsedPutRequest = await putRequestResult.json();

        return parsedPutRequest as T;
    }
}
