export default class {
    constructor({from = 0, to = 0, duraction = 0, delay = 0, startTime = 0}) {
        this.from = from; 
        this.value = from;
        this.to = to; 
        this.duraction = duraction; 
        this.delay = delay;
        this.startTime = startTime;
    }

    update(time) {
        if(this.value === this.to)
            return false;

        const t_delta = time - this.startTime;

        let elapsed = (t_delta / this.duraction);

        if(elapsed > 1)
            elapsed = 1;
        else if (elapsed < 0)
            elapsed = 0;

        const v_delta = (this.to - this.from) * elapsed;

        this.value = this.from + v_delta;

        return true;
    }
}