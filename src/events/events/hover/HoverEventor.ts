import { Eventor } from "../../eventor/Eventor";
import { Hoverable } from "./Hoverable";
import { HoverEvent } from "./HoverEvent";

export class HoverEventor extends Eventor<HoverEvent, Hoverable> {

    protected states = new Map<Hoverable, boolean>()

    constructor() {
        super();
    }

    override addListener(obj: Hoverable) {
        super.addListener(obj);
        this.states.set(obj, false);
    }

    protected sub_element(canvas_el: HTMLCanvasElement): void {
        canvas_el.addEventListener('mousemove', this.listener.bind(this))
    }
    private listener(event: MouseEvent) {
        const point = { x: event.offsetX, y: event.offsetY };
        this.objects.forEach(object => {
            const state = this.states.get(object);
            if (object.isBelongPoint(point))
            {
                if(state)
                    object.onMouseMove(HoverEvent.from(event));
                else
                {
                    object.onMouseEnter(HoverEvent.from(event));
                    this.states.set(object, true);
                }
            }
            else if(state)
            {
                object.onMouseOut(HoverEvent.from(event));
                this.states.set(object, false);
            }
        })
    }
}