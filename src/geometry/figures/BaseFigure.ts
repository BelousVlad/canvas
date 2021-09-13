import { Point } from "./Point";

export default abstract class BaseFigure {
    protected __x: number;
    protected __y: number;
    
    constructor({x = 0, y = 0} = {}) {
        this.__x = x;
        this.__y = y;
    }

    public set x(val: number) { this.__x = val }
    public set y(val: number) { this.__y = val } 
    public get x() { return this.__x }
    public get y() { return this.__y } 

    isBelousPoint(point: Point) {
        return false;
    }
}