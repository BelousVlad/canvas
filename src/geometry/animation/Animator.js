import Transition from "./Transition";

export default new class {
    constructor() {
        this.updates = new Map();
        this.animations = [];

        requestAnimationFrame(this.update.bind(this))
    }
    
    update(time) {
        this.time = time;
        for(let animation of this.animations) {
            if(animation.update(time))
                this.updates.get(animation)?.(animation.value);
        }
        requestAnimationFrame(this.update.bind(this))
    }

    makeAnimation(transition) {
        // const anim = new Transition({duraction, startTime: this.time, timing_function}, transform);

        this.animations.push(transition);
    }

    onUpdate(animation, callback) {
        this.updates.set(animation, callback)
    } 
}
