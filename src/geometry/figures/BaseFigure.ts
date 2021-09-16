import Transition from "../animation/Transition";
import { TransitionableProperty } from "../animation/TransitionableProperty";
import { Point } from "./Point";

export default abstract class BaseFigure {
    protected __x: TransitionableProperty;
    protected __y: TransitionableProperty;
    
    constructor({x = 0, y = 0} = {}) {
        this.__x = new TransitionableProperty(x);
        this.__y = new TransitionableProperty(y);
    }

    public set x(val: number) { this.__x.value = val }
    public set y(val: number) { this.__y.value = val } 
    public get x() { return this.__x.value }
    public get y() { return this.__y.value }

    public setXTransition(t: Transition) { this.__x.transition = t }
    public setYTransition(t: Transition) { this.__y.transition = t }

    isBelousPoint(point: Point) {
        return false;
    }
}