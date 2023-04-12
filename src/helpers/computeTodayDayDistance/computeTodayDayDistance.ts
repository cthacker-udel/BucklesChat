/**
 * Computes the day difference between the date passed in and today
 *
 * @param date - The date to compute the distance of
 * @param past - Whether to compute the time that has passed since the date passed in or the time ahead it is
 * @returns The number of days between today and the date passed in
 */
export const computeTodayDayDistance = (date: Date, past = true): number => {
    const difference = past
        ? Date.now() - date.getTime()
        : date.getTime() - Date.now();
    const convertToDays = difference / 86_400_000;
    return Math.round(convertToDays);
};
