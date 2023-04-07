import { v4 } from "uuid";

import type {
    ApiResponse,
    ExceptionLog,
    ImagePayload,
    ImageResponse,
} from "@/@types";
import { Endpoints } from "@/assets";

import { ClientSideApi } from "../ClientSideApi";
import { ServerSideApi } from "../ServerSideApi";

/**
 * All methods involving uploading images to image hosting service
 */
export class ImageApi extends ServerSideApi {
    /**
     * Uploads an image to ImgBB, an image hosting service, via api request.
     *
     * @param image - the base64 encoded image
     * @param name - (optional) the name of the image
     * @param expiration - (optional) the expiration time of the image
     * @returns The response from the api, or undefined if exception was thrown
     */
    public static UploadImage = async (
        image: string,
        name?: string,
        expiration?: number,
    ): Promise<ImageResponse | undefined> => {
        try {
            const uploadRequest = await fetch(
                `${Endpoints.IMAGE.BASE}${Endpoints.IMAGE.UPLOAD}`,
                {
                    body: JSON.stringify({
                        expiration,
                        image,
                        key: process.env.IMGBB_KEY,
                        name,
                    } as ImagePayload),
                    method: "POST",
                },
            );
            const parsedResponse = await uploadRequest.json();
            return parsedResponse as ImageResponse;
        } catch (error: unknown) {
            try {
                const convertedError = error as Error;
                await ClientSideApi.post<ApiResponse<string>, ExceptionLog>(
                    `${Endpoints.LOGGER.BASE}${Endpoints.LOGGER.EXCEPTION}`,
                    {
                        id: v4.toString(),
                        message: convertedError.message,
                        stackTrace: convertedError.stack,
                        timestamp: Date.now(),
                    },
                );
            } catch {}
            return undefined;
        }
    };
}
