import Drawler from "../../Drawler";
import BaseFigure from "../BaseFigure";

export default class QuadraticCurve extends BaseFigure{
    constructor({x = 0, y = 0, x1 = 0, y1 = 0, cpx = 0, cpy = 0}, drawler = new QuadraticCurveDrawler()){
        super({x,y}, drawler);
        this.x1 = x1;
        this.y1 = y1;
        this.cpx = cpx;
        this.cpy = cpy;
    }
}

export class QuadraticCurveDrawler extends Drawler {
    update(ctx, time, curve) {
        this.begin(ctx);
        ctx.moveTo(curve.x + this.shift_x, curve.y + this.shift_y);
        ctx.quadraticCurveTo(curve.cpx + this.shift_x, curve.cpy + this.shift_y, curve.x1 + this.shift_x, curve.y1 + this.shift_y);
        this.end(ctx);
    }
}