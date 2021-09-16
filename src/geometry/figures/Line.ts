import { Figure } from "./Figure";
import { Drawler } from "./drawler/Drawler";
import { TransitionableProperty } from "../animation/TransitionableProperty";
import Transition from "../animation/Transition";

export class Line extends Figure {
    __x0: TransitionableProperty;
    __y0: TransitionableProperty;
    __x1: TransitionableProperty;
    __y1: TransitionableProperty;

    constructor({x = 0, y = 0, x0 = 0, y0 = 0, x1 = 0, y1 = 0} = {}, drawler = new LineDrawler()) {
        super({x,y}, drawler);
        
        this.__x0 = new TransitionableProperty(x0);
        this.__y0 = new TransitionableProperty(y0);
        this.__x1 = new TransitionableProperty(x1);
        this.__y1 = new TransitionableProperty(y1);
    }

    set x0(val) { this.__x0.value = val; }
    get x0()    { return this.__x0.value; }
    set y0(val) { this.__y0.value = val; }
    get y0()    { return this.__y0.value; }
    set x1(val) { this.__x1.value = val; }
    get x1()    { return this.__x1.value; }
    set y1(val) { this.__y1.value = val; }
    get y1()    { return this.__y1.value; }

    setX0Transition(t: Transition) { this.__x0.transition = t }
    setY0Transition(t: Transition) { this.__y0.transition = t }
    setX1Transition(t: Transition) { this.__x1.transition = t }
    setY1Transition(t: Transition) { this.__y1.transition = t }
}

export class LineDrawler extends Drawler<Line>{
    update(ctx: CanvasRenderingContext2D, line: Line) {
        this.begin(ctx);
        const startX = line.x + line.shift_x;
        const startY = line.y + line.shift_y;
        ctx.moveTo(startX + line.x0, startY + line.y0);
        
        ctx.lineTo(startX + line.x1, startY + line.y1);

        // console.log(startX + line.x0)
        
        this.end(ctx);
    }
}