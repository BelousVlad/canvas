import { Figure } from "./Figure";
import { Drawler } from "./drawler/Drawler";

export class Line extends Figure {
    x1: number;
    y1: number;

    constructor({x = 0, y = 0, x1 = 0, y1 = 0} = {}, drawler = new LineDrawler()) {
        super({x,y}, drawler);
        
        this.x1 = x1;
        this.y1 = y1;
    }
}

export class LineDrawler extends Drawler<Line>{
    update(ctx: CanvasRenderingContext2D, line: Line) {
        this.begin(ctx);
        ctx.moveTo(line.x + line.shift_x, line.y + line.shift_y);
        
        ctx.lineTo(line.x1 + line.shift_x, line.y1 + line.shift_y);
        
        this.end(ctx);
    }
}