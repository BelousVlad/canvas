import { Transform } from "./Transform";

export default class {
    constructor({duraction = 0, delay = 0, startTime = 0, timing_function = (elapsed) => elapsed }, transforms) {
        this.duraction = duraction; 
        this.delay = delay;
        this.startTime = startTime;
        this.ended = false;
        this.transforms = transforms ?? [];
        this.timing_function = timing_function;
        this.change_listeners = [];
    }

    addTransform(transf) { 
        this.transforms.push(transf);
        return this;
    }

    addChangeListener(listetner) {
        this.change_listeners.push(listetner);
    }

    removeTransform(transf) {
        const i = this.transforms.indexOf(transf)
        return this.transforms.splice(i,1)[0];
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
        this.transforms.forEach((transform) => {
            this.__transform(transform ,this.timing_function(elapsed));
        })

        return true;
    }

    __transform(transform, elapsed) {
        // console.log(123)
        if(transform instanceof Transform)
        {
            transform.doTransfom(elapsed);
            // console.log(123)
            this.change_listeners.forEach((listener) => listener());
        }
        else if (typeof transform === 'function')
        {
            transform(elapsed);
            this.change_listeners.forEach((listener) => listener());
        }
        else 
            throw 'transform type error';
    };
}