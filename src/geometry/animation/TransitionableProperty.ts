import Animator from "./Animator";
import { Transform } from "./Transform";
import Transition from "./Transition";

export class TransitionableProperty {
    private __value: number;

    private __transition!: Transition;

    private current_transform: Transform;
    private change_listeners = Array<Function>();

    constructor(val: number, trans?: Transition) {
        this.__value = val;
        this.transition = trans;
    }

    addChangeListeners(listener: Function) {
        this.change_listeners.push(listener);
        // this.transition.addChangeListener(listener);
    }

    set transition(transition: Transition) {
        this.__transition = transition;
        for(let l of this.change_listeners) {
            // console.log(l)
            this.__transition.addChangeListener(l);
            // this.__transition.addEndListener
        }
    }

    get value(): number { return this.__value };
    set value(new_val) {
        // console.log(this.__transition);
        if(this.__transition)
        {
            const transform = new Transform(this, { __value: new_val - this.__value });
            if(this.current_transform)
                this.__transition.removeTransform(this.current_transform)
            this.current_transform = transform;
            Animator.makeAnimation(this.__transition.addTransform(transform))
        }
        else
            this.__value = new_val
    }
}