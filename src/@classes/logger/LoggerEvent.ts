import { v4 as uuidv4 } from "uuid";

import type { EventLog } from "@/@types";

/**
 *
 */
export class LoggerEvent {
    public id?: string;

    public message?: string;

    public type?: string;

    /**
     *
     * @param type
     * @param _message
     * @param _id
     */
    public constructor(type: string, _message?: string, _id?: string) {
        this.message = _message;
        this.type = type;
        this.id = _id ?? uuidv4();
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

    public toEventLog = (): EventLog => this as EventLog;
}
