import Animator from "./Animator";
import { Transform } from "./Transform";
import Transition from "./Transition";

export class TransitionableProperty {
    private __value: number;

    transition!: Transition;
    constructor(val: number, trans?: Transition) {
        this.__value = val;
        this.transition = trans;
    }

    get value(): number { return this.__value };
    set value(new_val) {
        if(this.transition)
            Animator.makeAnimation(this.transition.setTransform(new Transform(this, { __value: new_val - this.__value })))
        else
            this.__value = new_val
    }
}