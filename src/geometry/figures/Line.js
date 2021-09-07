import Drawler from "../Drawler";
import BaseFigure from "./BaseFigure";

export class Line extends BaseFigure {
    constructor({x = 0, y = 0, x1 = 0, y1 = 0} = {}, drawler = new LineDrawler()) {
        super({x,y}, drawler);

        this.x1 = x1;
        this.y1 = y1;
    }
}

export class LineDrawler extends Drawler{
    update(ctx, time, line) {
        this.begin(ctx);
        ctx.moveTo(line.x + this.shift_x, line.y + this.shift_y);
        ctx.lineTo(line.x1 + this.shift_x, line.y1 + this.shift_y);
        // console.log(line.x1 + this.shift_x, line.y1 + this.shift_y);
        
        this.end(ctx);
    }
}