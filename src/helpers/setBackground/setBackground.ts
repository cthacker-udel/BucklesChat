import type { StaticImageData } from "next/image";

type SetBackgroundConfiguration = {
  backgroundSize?: string;
  backgroundBlendMode?: string;
  backgroundColor?: string;
  backgroundRColor?: number;
  backgroundGColor?: number;
  backgroundBColor?: number;
  backgroundOpacity?: number;
};

/**
 * Validates the background color values supplied, ensuring they are correct and not out of range
 *
 * @param options - The background options supplied
 */
const validateOptionsRGBValues = (
  options?: SetBackgroundConfiguration
): void => {
  if (options !== undefined) {
    const {
      backgroundRColor: red,
      backgroundGColor: green,
      backgroundBColor: blue,
      backgroundOpacity: opacity,
    } = options;

    if (red !== undefined && (red < 0 || red > 255)) {
      throw new Error(
        "Invalid red value supplied in the options configuration"
      );
    } else if (blue !== undefined && (blue < 0 || blue > 255)) {
      throw new Error(
        "Invalid blue value supplied in the options configuration"
      );
    } else if (green !== undefined && (green < 0 || green > 255)) {
      throw new Error(
        "Invalid green value supplied in the options configuration"
      );
    } else if (opacity !== undefined && (opacity < 0 || opacity > 1)) {
      throw new Error(
        "Invalid opacity value supplied in the options configuration"
      );
    }
  }
};

/**
 * Mutates the options if they pass validation so the background color can be displayed properly
 *
 * @param options - The background color options supplied
 */
const mutateOptions = (options: SetBackgroundConfiguration): void => {
  const {
    backgroundRColor: red,
    backgroundGColor: green,
    backgroundBColor: blue,
    backgroundOpacity: opacity,
  } = options;

  const parsedColor = `rgba(${red ?? 255}, ${green ?? 255}, ${blue ?? 255}, ${
    opacity ?? 0.35
  })`;

  options.backgroundColor = parsedColor;
};

/**
 * Sets the background of the body element of the DOM
 *
 * @param _doc - The document instance
 * @param image - The image we are appending
 */
const setBackground = (
  _document: Document,
  image: StaticImageData,
  options?: SetBackgroundConfiguration
): void => {
  if (options !== undefined) {
    validateOptionsRGBValues(options);
    mutateOptions(options);
  }

  const body = _document.querySelector("body");
  if (body !== null) {
    body.style.backgroundImage = `url(${image.src})`;
    body.style.backgroundSize = options?.backgroundSize ?? "cover";
    body.style.backgroundBlendMode = options?.backgroundBlendMode ?? "lighten";
    body.style.backgroundColor =
      options?.backgroundColor ?? "rgba(255, 255, 255, 0.35)";
  }
};

export { setBackground, type SetBackgroundConfiguration };
