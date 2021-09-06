import Transition from "./Transition";

export default class {
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

    makeAnimation(to, duraction) {
        const anim = new Transition({to, duraction, startTime: this.time});

        this.animations.push(anim);
        return anim;
    }

    onUpdate(animation, callback) {
        this.updates.set(animation, callback)
    } 
}
