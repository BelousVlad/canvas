import Drawler from "../Drawler";
import BaseFigure from "./BaseFigure";

export class Rectangle extends BaseFigure {
    constructor({x = 0, y = 0, width = 0, height = 0} = {}, drawler = new RectangleDrawler()) {
        super({x,y}, drawler);

        this.width = width;
        this.height = height;
    }
}

export class RectangleDrawler extends Drawler{
    update(ctx, time, reactangle) {
        this.begin(ctx);
        
        ctx.rect(reactangle.x + this.shift_x, reactangle.y + this.shift_y, reactangle.width, reactangle.height)
        
        this.end(ctx);
    }
}