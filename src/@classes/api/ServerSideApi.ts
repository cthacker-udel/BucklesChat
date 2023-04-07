/* eslint-disable sonarjs/no-duplicate-string -- disabled */
/* eslint-disable @typescript-eslint/no-extraneous-class -- disabled */
/* eslint-disable @typescript-eslint/indent -- disabled */

/**
 *
 */
export class ServerSideApi {
    /**
     *
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
            `${process.env.SERVICE_URL}${endpoint}${queryString}`,
            {
                credentials: "include",
                method: "GET",
                mode: "cors",
            },
        );

        const parsedGetRequest = await getRequestResult.json();

        return parsedGetRequest as T;
    }

    /**
     *
     * @param endpoint
     * @param body
     * @param queryParameters
     */
    public static async post<T, K = { [key: string]: number | string }>(
        endpoint: string,
        body: K,
        queryParameters?: { [key: string]: number | string },
        headers?: { [key: string]: string },
    ): Promise<T> {
        const modifiedHeaders = {
            ...headers,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";

        const stringifiedBody = JSON.stringify(body ?? {});

        const postRequestResult = await fetch(
            `${process.env.SERVICE_URL}${endpoint}${queryString}`,
            {
                body: stringifiedBody,
                credentials: "include",
                headers: modifiedHeaders ?? {},
                method: "POST",
                mode: "cors",
            },
        );

        const parsedPostRequest = await postRequestResult.json();

        return parsedPostRequest as T;
    }

    /**
     *
     * @param endpoint
     * @param queryParameters
     */
    public static async delete<T>(
        endpoint: string,
        queryParameters?: { [key: string]: number | string },
        headers?: { [key: string]: number | string },
    ): Promise<T> {
        const modifiedHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";
        const deleteRequestResult = await fetch(
            `${process.env.SERVICE_URL}${endpoint}${queryString}`,
            {
                credentials: "include",
                headers: modifiedHeaders,
                method: "DELETE",
                mode: "cors",
            },
        );

        const parsedDeleteRequest = await deleteRequestResult.json();

        return parsedDeleteRequest as T;
    }

    /**
     *
     * @param endpoint
     * @param body
     * @param queryParameters
     * @returns
     */
    public static async put<T, K = { [key: string]: number | string }>(
        endpoint: string,
        body?: K,
        queryParameters?: { [key: string]: number | string },
        headers?: { [key: string]: string },
    ): Promise<T> {
        const modifiedHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };
        const queryString = queryParameters
            ? `${Object.entries(queryParameters)
                  .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                  .join("")}`
            : "";

        console.log(`${process.env.SERVICE_URL}${endpoint}${queryString}`);
        const putRequestResult = await fetch(
            `${process.env.SERVICE_URL}${endpoint}${queryString}`,
            {
                body: JSON.stringify(body ?? {}),
                credentials: "include",
                headers: modifiedHeaders,
                method: "PUT",
                mode: "cors",
            },
        );

        const parsedPutRequest = await putRequestResult.json();

        return parsedPutRequest as T;
    }
}
