import type { StaticImageData } from "next/image";

import type { SetBackgroundConfiguration } from "@/helpers";

export type _useBackground = (
    _image: StaticImageData,
    _options?: SetBackgroundConfiguration,
) => void;
