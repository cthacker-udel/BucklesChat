/* eslint-disable @typescript-eslint/indent -- disabled */

/**
 *
 */
export class ClientSideApi {
    public BASE_URL: string | undefined;

    /**
     *
     */
    public constructor() {
        this.BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;
    }

    /**
     *
     */
    public async get<T>(
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
                cache: "default",
                method: "GET",
            },
        );

        const parsedResult = await getRequestResult.json();
        return parsedResult as T;
    }

    /**
     *
     * @param endpoint
     * @param body
     * @param queryParameters
     */
    public async post<T, K = { [key: string]: number | string }>(
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
            { body: JSON.stringify(body ?? {}), method: "POST" },
        );

        const parsedPostRequest = await postRequestResult.json();

        return parsedPostRequest as T;
    }

    /**
     *
     * @param endpoint
     * @param queryParameters
     */
    public async delete<T>(
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
            { method: "DELETE" },
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
    public async put<T, K = { [key: string]: number | string }>(
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
            { body: JSON.stringify(body ?? {}), method: "PUT" },
        );

        const parsedPutRequest = await putRequestResult.json();

        return parsedPutRequest as T;
    }
}
