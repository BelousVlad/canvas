import { Drawler } from "../drawler/Drawler";
import { Figure } from "../Figure";

export default class CubicBezierCurve extends Figure{

    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;

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

export class CubicBezierCurveDrawler extends Drawler<CubicBezierCurve> {
    update(ctx: CanvasRenderingContext2D, curve: CubicBezierCurve) {
        this.begin(ctx);
        
        const x0 = curve.x +  curve.shift_x, y0 = curve.y +  curve.shift_y;
        const x1 = curve.x2 + curve.shift_x, y1 = curve.y1 + curve.shift_y;
        const x2 = curve.x2 + curve.shift_x, y2 = curve.y2 + curve.shift_y;
        const x3 = curve.x3 + curve.shift_x, y3 = curve.y3 + curve.shift_y;

        ctx.moveTo(x0, y0);
        ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);

        this.end(ctx);
    }
}