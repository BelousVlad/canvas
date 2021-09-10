import Drawler from "../../Drawler";
import { cubic_bezie } from "../../helpers/Animation";
import { curve_cubic_bezie } from "../../helpers/Bezie";
import BaseFigure from "../BaseFigure";

export default class CubicBezierCurve extends BaseFigure{
    constructor({x = 0, y = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0}, drawler = new CubicBezierCurveDrawler()){
        super({x,y}, drawler);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }
}

export class CubicBezierCurveDrawler extends Drawler {
    update(ctx, time, curve) {
        this.begin(ctx);
        // ctx.moveTo(curve.x + this.shift_x, curve.y + this.shift_y);
        // ctx.quadraticCurveTo(curve.cpx + this.shift_x, curve.cpy + this.shift_y, curve.x1 + this.shift_x, curve.y1 + this.shift_y);

        const x0 = curve.x + this.shift_x, y0 = curve.y + this.shift_y;
        const x1 = curve.x2 + this.shift_x, y1 = curve.y1 + this.shift_y;
        const x2 = curve.x2 + this.shift_x, y2 = curve.y2 + this.shift_y;
        const x3 = curve.x3 + this.shift_x, y3 = curve.y3 + this.shift_y;

        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);

        this.end(ctx);
    }
}

export class CubicBezierCurveDrawlerMy extends Drawler {
    update(ctx, time, curve) {
        this.begin(ctx);
        // ctx.moveTo(curve.x + this.shift_x, curve.y + this.shift_y);
        // ctx.quadraticCurveTo(curve.cpx + this.shift_x, curve.cpy + this.shift_y, curve.x1 + this.shift_x, curve.y1 + this.shift_y);

        const x0 = curve.x + this.shift_x, y0 = curve.y + this.shift_y;
        const x1 = curve.x2 + this.shift_x, y1 = curve.y1 + this.shift_y;
        const x2 = curve.x2 + this.shift_x, y2 = curve.y2 + this.shift_y;
        const x3 = curve.x3 + this.shift_x, y3 = curve.y3 + this.shift_y;

        const curve_func = curve_cubic_bezie({x: x0, y: y0},{x: x1, y: y1},{x: x2, y: y2},{x: x3, y: y3});

        ctx.moveTo(x0, y0);
        for(let i = 0; i < 1.05; i+=0.05) {
            const {x, y} = curve_func(i);
            ctx.lineTo(x,y);
        }


        this.end(ctx);
    }
}