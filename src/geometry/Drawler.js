export default class Drawler {
    shift_x = 0;
    shift_y = 0;
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