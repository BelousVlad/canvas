import { Transform } from "./Transform";

export default class {
    constructor({duraction = 0, delay = 0, startTime = 0, timing_function = (elapsed) => elapsed }, transform) {
        this.duraction = duraction; 
        this.delay = delay;
        this.startTime = startTime;
        this.ended = false;
        this.transform = transform;
        this.timing_function = timing_function;
    }

    setTransform(transf) { 
        this.transform = transf;
        return this;
    }

    update(time) {
        if(this.ended)
            return false;
        
        const t_delta = time - this.startTime;

        let elapsed = (t_delta / this.duraction);

        if(elapsed > 1)
        {
            this.ended = true;
            elapsed = 1;
        }
        else if (elapsed < 0)
        {
            this.ended = true;
            elapsed = 0;
        }
        this.__transform(this.timing_function(elapsed));

        return true;
    }

    __transform(elapsed) {
        if(this.transform instanceof Transform)
            this.transform.doTransfom(elapsed);
        else if (typeof this.transform === 'function')
            this.transform(elapsed);
        else 
            throw 'transform type error';
    };
}