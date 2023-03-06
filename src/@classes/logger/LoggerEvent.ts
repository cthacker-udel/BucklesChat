import { v4 as uuidv4 } from "uuid";

import type { EventLog } from "@/@types";

/**
 *
 */
export class LoggerEvent {
    public id?: string;

    public message?: string;

    public type?: string;

    public timestamp?: number = Date.now();

    /**
     *
     * @param type
     * @param _message
     * @param _id
     */
    public constructor(
        type: string,
        _message?: string,
        _id?: string,
        _timestamp?: number,
    ) {
        this.message = _message;
        this.type = type;
        this.id = _id ?? uuidv4();
        this.timestamp = this.timestamp ?? _timestamp ?? Date.now();
    }

    public setType = (_type: string): this => {
        this.type = _type;
        return this;
    };

    public setMessage = (_message: string): this => {
        this.message = _message;
        return this;
    };

    public setId = (_id: string): this => {
        this.id = _id;
        return this;
    };

    public setTimestamp = (_timestamp: number): this => {
        this.timestamp = _timestamp;
        return this;
    };

    public toEventLog = (): EventLog => this as EventLog;
}
