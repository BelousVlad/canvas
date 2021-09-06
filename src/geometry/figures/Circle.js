import Base from './BaseFigure'

export class Circle extends Base{
    constructor({ x = 0, y = 0, radius = 10} = {}) {
        super({x,y})
        this.radius = radius;
    }

    get center() {
        return [this.x + this.radius, this.y + this.radius];
    }
}
export class CircleDrawler {
    update(ctx, time, circle) {
        const [x,y] = circle.center;

        ctx.beginPath();
        ctx.arc(x, y, circle.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}