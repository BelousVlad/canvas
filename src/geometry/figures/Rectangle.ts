import Transition from "../animation/Transition";
import { TransitionableProperty } from "../animation/TransitionableProperty";
import { cubic_bezier } from "../helpers/Animation";
import CanBelongPoint from "../interfaces/CanBeloungPoint";
import { Drawler } from "./drawler/Drawler";
import { Figure } from "./Figure";
import { Point } from "./Point";



export  class Rectangle extends Figure implements CanBelongPoint{
    private __width:  TransitionableProperty;
    private __height: TransitionableProperty;

    constructor({x = 0, y = 0, width = 0, height = 0} = {}, drawler = new RectangleDrawler()) {
        super({x,y}, drawler);
        this.__width = new TransitionableProperty(width);
        this.__height = new TransitionableProperty(height);
    }

    set width(val) { this.__width.value = val; }
    get width() { return this.__width.value; }
    set height(val) { this.__height.value = val; }
    get height() { return this.__height.value; }

    setWidthTransition(t: Transition) { this.__width.transition = t }
    setHeightTransition(t: Transition) { this.__height.transition = t }
    
    isBelongPoint(p: Point): boolean {
        const   x_start = this.realShiftX + this.x + this.translate_x,
                x_end = this.realShiftX + this.x + this.width + this.translate_x;
        const   y_start = this.realShiftY + this.y + this.translate_y,
                y_end = this.realShiftY + this.y + this.height + this.translate_y;

        return p.x <= x_end && p.x >= x_start && p.y <= y_end && p.y >= y_start; 
    }
}

export class RectangleDrawler extends Drawler<Rectangle>{
    update(ctx: CanvasRenderingContext2D, rectangle: Rectangle) {
        this.begin(ctx);
        
        ctx.rect(rectangle.x + rectangle.translate_x + rectangle.shift_x, rectangle.y + rectangle.translate_y + rectangle.shift_y, rectangle.width, rectangle.height)
        
        this.end(ctx);
    }
}