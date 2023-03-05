import type { EventLog } from "../api";

export type ILoggerContext = {
    logException: (_exception: Error, _id?: number) => void;
    logEvent: (_event: EventLog, _id?: number) => void;
};
