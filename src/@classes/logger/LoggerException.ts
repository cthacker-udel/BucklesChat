/**
 * Represents an exception being logged to the MongoDB database
 */
export class LoggerException {
    public id?: number;

    public message?: string;

    public stackTrace?: string;

    public timestamp?: number;

    /**
     *
     * @param error - The exception being logged
     */
    public constructor(error: Error, _id?: number) {
        this.message = error.message;
        this.stackTrace = error.stack;
        this.timestamp = Date.now();
        this.id = _id ?? Math.round(Math.random() * 998);
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
}
