import { Hoverable } from "../../events/events/hover/Hoverable";
import { HoverEvent } from "../../events/events/hover/HoverEvent";
import { Transformator } from "../animation/transforms/Transformator";
import { Translateable } from "../animation/transforms/translate/Translatable";
import Transition from "../animation/Transition";
import { TransitionableProperty } from "../animation/TransitionableProperty";
import BaseFigure from "./BaseFigure";
import { IDrawable } from "./drawler/IDrawable";
import { IDrawler } from "./drawler/IDrawler";
import Group from "./group/Group";
import { IGroupable } from "./group/IGroupable";
import { Point } from "./Point";

export abstract class Figure extends BaseFigure implements IDrawable, IGroupable, Hoverable, Translateable{
    
    drawler: IDrawler<Figure>
    group!: Group;
    shift_x: number = 0;
    shift_y: number = 0;

    protected transformator = new Transformator();

    constructor({x = 0, y = 0} = {}, drawler: IDrawler<Figure>) {
        super({x,y})
        this.drawler = drawler;
        this.translate(0,0);
    }
    get translate_x(): number {
        return this.transformator.getTransform('x');
    }
    get translate_y(): number {
        return this.transformator.getTransform('x')
    }
    translateX(_x: number): void {
        this.transformator.setTransform('x', _x);
    }
    translateY(_y: number): void {
        this.transformator.setTransform('y', _y);
    }
    translate(_x: number, _y: number): void {
        this.translateX(_x);
        this.translateY(_y);
    }

    setTranslateTransition(t: Transition) {
        this.transformator.setTransition('x', t)
        this.transformator.setTransition('y', t)
    }
    
    getDrawler(): IDrawler<Figure> {
        return this.drawler;
    }
    
    get realShiftX() { return this.shift_x + (this.group ? this.group.shift_x : 0)}
    get realShiftY() { return this.shift_y + (this.group ? this.group.shift_y : 0)}

    onMouseEnter(event: HoverEvent): void {
        
    }
    onMouseOut(event: HoverEvent): void {
        
    }
    onMouseMove(event: HoverEvent): void {
        
    }
    isBelongPoint(p: Point): boolean {
        return false;
    }
}