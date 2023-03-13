import type { EventLog } from "./EventLog";
import type { ExceptionLog } from "./ExceptionLog";

export type LoggerPost = {
    log: EventLog | ExceptionLog;
};
