type ImageInformation = {
    filename: string;
    name: string;
    mime: string;
    extension: string;
    url: string;
};

type ImageDataPayload = {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    expiration: string;
    image: ImageInformation;
    thumb: ImageInformation;
    medium: ImageInformation;
    delete_url: string;
};

export type ImageResponse = {
    data: ImageDataPayload;
    success: boolean;
    status: number;
};
