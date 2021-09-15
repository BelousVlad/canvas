import CanBelongPoint from "../interfaces/CanBeloungPoint";
import { Drawler } from "./drawler/Drawler";
import { Figure } from "./Figure";
import { Point } from "./Point";

export  class Rectangle extends Figure implements CanBelongPoint{
    public width: number;
    public height: number;

    constructor({x = 0, y = 0, width = 0, height = 0} = {}, drawler = new RectangleDrawler()) {
        super({x,y}, drawler);

        this.width = width;
        this.height = height;
    }
    
    isBelongPoint(p: Point): boolean {
        const   x_start = this.realShiftX + this.x,
                x_end = this.realShiftX + this.x + this.width;
        const   y_start = this.realShiftY + this.y,
                y_end = this.realShiftY + this.y + this.height;

        return p.x <= x_end && p.x >= x_start && p.y <= y_end && p.y >= y_start; 
    }
    
}

export class RectangleDrawler extends Drawler<Rectangle>{
    update(ctx: CanvasRenderingContext2D, reactangle: Rectangle) {
        this.begin(ctx);
        
        ctx.rect(reactangle.x + reactangle.shift_x, reactangle.y + reactangle.shift_y, reactangle.width, reactangle.height)
        
        this.end(ctx);
    }
}