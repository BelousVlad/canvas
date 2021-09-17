import Transition from "../../animation/Transition";
import { TransitionableProperty } from "../../animation/TransitionableProperty";
import { Drawler } from "../drawler/Drawler";
import { Figure } from "../Figure";

export default class Arc extends Figure {

    __radius: TransitionableProperty;
    __startAngle: TransitionableProperty;
    __endAngle: TransitionableProperty;

    constructor({x = 0, y = 0, radius = 0, startAngle = 0, endAngle = 0} = {}, drawler = new ArcDrawler()) {
        super({x,y}, drawler);
        this.__radius = new TransitionableProperty(radius);
        this.__startAngle = new TransitionableProperty(startAngle);
        this.__endAngle = new TransitionableProperty(endAngle);
    }

    set radius(val) { this.__radius.value = val; }
    set startAngle(val) { this.__startAngle.value = val; }
    set endAngle(val) { this.__endAngle.value = val; }
    get radius() { return this.__radius.value; }
    get startAngle() { return this.__startAngle.value; }
    get endAngle() { return this.__endAngle.value; }

    get center() {
        return [this.x + this.radius, this.y + this.radius];
    }

    setRadiusTransition(t: Transition) { this.__radius.transition = t; }
    setStartAngleTransition(t: Transition) { this.__startAngle.transition = t; }
    setEndAngleTransition(t: Transition) { this.__endAngle.transition = t; }
}

export class ArcDrawler extends Drawler<Arc>{
    update(ctx: CanvasRenderingContext2D, arc: Arc) {
        const [x,y] = arc.center;

        this.begin(ctx);
        ctx.arc(x + arc.shift_x + arc.translate_x, y + arc.shift_y + arc.translate_y, arc.radius, arc.startAngle, arc.endAngle);
        this.end(ctx)
    }
}