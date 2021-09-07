import BaseFigure from "../BaseFigure";
import Drawler from "../../Drawler";

export default class Arc extends BaseFigure {
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

export class ArcDrawler extends Drawler{
    update(ctx, time, arc) {
        const [x,y] = arc.center;

        this.begin(ctx);
        ctx.arc(x + this.shift_x, y + this.shift_y, arc.radius, arc.startAngle, arc.endAngle);
        // console.log(x + this.shift_x, y + this.shift_y, arc.radius, arc.startAngle, arc.endAngle);
        this.end(ctx)
    }
}