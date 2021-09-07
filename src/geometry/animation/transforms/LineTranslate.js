import { Transform } from "../Transform";

export default class extends Transform{
    constructor(line, { x_delta = 0, y_delta = 0 }) {
        super();
        this.line = line
        this.x_delta = x_delta;
        this.y_delta = y_delta

        this.x_start = line.x;
        this.x1_start = line.x1;
        this.y_start = line.y;
        this.y1_start = line.y1;
    }

    doTransfom(elapsed) {
        this.line.x = this.x_start + this.x_delta * elapsed;
        this.line.x1 = this.x1_start + this.x_delta * elapsed;

        this.line.y = this.y_start + this.y_delta * elapsed;
        this.line.y1 = this.y1_start + this.y_delta * elapsed;
        // console.log(elapsed)
    }
}