export default class Drawler {
    
    constructor() {
        this.shift_x = 0;
        this.shift_y = 0;
    }
    update(ctx, time, figure) {
        throw 'Override update method';
    }

    begin(ctx) {
        ctx.beginPath();
    }
    end(ctx) {
        ctx.stroke();
        ctx.closePath();
    }
}