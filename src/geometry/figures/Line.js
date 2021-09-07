import BaseFigure from "./BaseFigure";

export class Line extends BaseFigure {
    constructor({x = 0, y = 0, x1 = 0, y1 = 0}, drawler = new LineDrawler()) {
        super({x,y}, drawler);

        this.x1 = x1;
        this.y1 = y1;
    }
}

export class LineDrawler {
    update(ctx, time, line) {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x1, line.y1);
        ctx.stroke();
        ctx.closePath();
    }
}