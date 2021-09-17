import Transition from "../../../../animation/Transition";
import { cubic_bezier } from "../../../../helpers/Animation";
import { calc_leg_x, calc_leg_y } from "../../../../helpers/Math";
import Segment from "../../segment/Segment";

export class PieSegment extends Segment {

    onMouseEnter() {
        const path = (this.arc.startAngle + this.arc.endAngle) / 2;
        this.translate(calc_leg_x(10, path), calc_leg_y(10, path))
    }

    onMouseOut() {
        const path = (this.arc.startAngle + this.arc.endAngle) / 2;
        this.translate(0,0);
    }

    
}