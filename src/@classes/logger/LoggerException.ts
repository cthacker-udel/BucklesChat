import { v4 as uuidv4 } from "uuid";

import type { ExceptionLog } from "@/@types";

/**
 * Represents an exception being logged to the MongoDB database
 */
export class LoggerException {
    public id?: string;

    public message?: string;

    public stackTrace?: string;

    public timestamp?: number = Date.now();

    /**
     *
     * @param error - The exception being logged
     */
    public constructor(error: Error, _id?: string) {
        this.message = error.message;
        this.stackTrace = error.stack?.slice(
            0,
            error.stack.length <= 100 ? error.stack.length : 100,
        );
        this.timestamp = Date.now();
        this.id = _id ?? uuidv4();
    }

    public setMessage = (_message: string): this => {
        this.message = _message;
        return this;
    };

    public setStackTrace = (_stackTrace: string): this => {
        this.stackTrace = _stackTrace;
        return this;
    };

    public setTimestamp = (_timestamp: number): this => {
        this.timestamp = _timestamp;
        return this;
    };

    public toExceptionLog = (): ExceptionLog => this as ExceptionLog;
}
