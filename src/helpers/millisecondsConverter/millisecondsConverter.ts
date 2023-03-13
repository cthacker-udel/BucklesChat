/**
 * Computes the total # of milliseconds according to the given arguments
 *
 * @param milliseconds - The number of milliseconds to compute
 * @param seconds - The number of seconds to convert to milliseconds
 * @param minutes - The number of minutes to convert to milliseconds
 * @param hours - The number of hours to convert to milliseconds
 * @returns - The total # of milliseconds specified by the arguments passed into the function
 */
export const millisecondsConverter = (
    milliseconds: number,
    seconds?: number,
    minutes?: number,
    hours?: number,
): number => {
    const secondsConverted = (seconds ?? 0) * 1000;
    const minutesConverted = (minutes ?? 0) * 60_000;
    const hoursConverted = (hours ?? 0) * 3_600_000;

    return milliseconds + secondsConverted + minutesConverted + hoursConverted;
};
