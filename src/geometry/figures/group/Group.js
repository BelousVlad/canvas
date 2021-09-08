import Drawler from "../../Drawler";
import BaseFigure from "../BaseFigure";

export default class Group extends BaseFigure{
    constructor({x = 0, y = 0, figures = []}, drawler = new GroupDrawler()) {
        super({x,y}, drawler);
        this.figures = figures;
    }
}

export class GroupDrawler extends Drawler{
    update(ctx, time, group) {
        // console.log(group)
        for(const figure of group.figures) {
            figure.drawler.shift_x = group.x + this.shift_x;
            figure.drawler.shift_y = group.y + this.shift_y;
            figure.drawler.update(ctx, time, figure);
        }
    }
}