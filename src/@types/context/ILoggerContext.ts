import type { EventLog } from "../api";

export type ILoggerContext = {
    logException: (_exception: Error, _id?: string) => Promise<void>;
    logEvent: (_event: EventLog, _id?: string) => Promise<void>;
    logOnline: () => Promise<boolean>;
};
