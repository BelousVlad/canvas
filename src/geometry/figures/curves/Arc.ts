import { Drawler } from "../drawler/Drawler";
import { Figure } from "../Figure";

export default class Arc extends Figure {

    radius: number;
    startAngle: number;
    endAngle: number;

    constructor({x = 0, y = 0, radius = 0, startAngle = 0, endAngle = 0} = {}, drawler = new ArcDrawler()) {
        super({x,y}, drawler);
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }

    get center() {
        return [this.x + this.radius, this.y + this.radius];
    }
}

export class ArcDrawler extends Drawler<Arc>{
    update(ctx: CanvasRenderingContext2D, arc: Arc) {
        const [x,y] = arc.center;

        this.begin(ctx);
        ctx.arc(x + arc.shift_x, y + arc.shift_y, arc.radius, arc.startAngle, arc.endAngle);
        this.end(ctx)
    }
}