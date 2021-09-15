import { IEvent } from "./IEvent";

export abstract class Event<T = {}> implements IEvent{
    constructor(public baseEvent: T) {}
}