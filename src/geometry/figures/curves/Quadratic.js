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

export class QuadraticCurveDrawler {
    update(ctx, time, curve) {
        ctx.beginPath();
        ctx.moveTo(curve.x, curve.y);
        ctx.quadraticCurveTo(curve.cpx, curve.cpy, curve.x1, curve.y1);
        ctx.stroke();
        ctx.closePath();
    }
}