import { Event } from "../../Event";

export class HoverEvent extends Event<MouseEvent>{
    constructor(event: MouseEvent, args = {}) {
        super(event);
    }

    static from(event: MouseEvent, args = {}): HoverEvent {
        return new HoverEvent(event, args);
    }
}