import BaseFigure from "../BaseFigure";

export default class Group extends BaseFigure{
    constructor({x = 0, y = 0, figures = []}, drawler = new GroupDrawler()) {
        super({x,y}, drawler);
        this.figures = figures;
    }
}

export class GroupDrawler {
    update(ctx, time, group) {
        for(const figure of group.figures) {
            // console.log(figure.drawler.shift_x)
            figure.drawler.shift_x = group.x;
            // console.log(figure.drawler.shift_x)
            figure.drawler.shift_y = group.y;
            figure.drawler.update(ctx, time, figure);
        }
    }
}