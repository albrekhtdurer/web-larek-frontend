import {IEvents} from "./events";

export abstract class Model {
    constructor(protected events: IEvents) {}

    emitChanges(event: string, payload?: object) {
        this.events.emit(event, payload ?? {});
    }
}