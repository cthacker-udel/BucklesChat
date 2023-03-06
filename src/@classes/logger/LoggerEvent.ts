import type { EventLog } from "@/@types";

/**
 *
 */
export class LoggerEvent {
    public id?: number;

    public message?: string;

    public type?: string;

    /**
     *
     * @param type
     * @param _message
     * @param _id
     */
    public constructor(type: string, _message?: string, _id?: number) {
        this.message = _message;
        this.type = type;
        this.id = _id ?? Math.round(Math.random() * 998);
    }

    public setType = (_type: string): this => {
        this.type = _type;
        return this;
    };

    public setMessage = (_message: string): this => {
        this.message = _message;
        return this;
    };

    public setId = (_id: number): this => {
        this.id = _id;
        return this;
    };

    public toEventLog = (): EventLog => this as EventLog;
}
