import Transition from "../../animation/Transition";
import { TransitionableProperty } from "../../animation/TransitionableProperty";
import { calc_leg_x, calc_leg_y } from "../../helpers/Math";
import Arc from "../curves/Arc";
import Group, { GroupDrawler } from "../group/Group";
import { Line } from "../Line";


export default class Section extends Group {

    private __radius: number;
    private __startAngle: number;
    private __endAngle: number;

    private line1: Line;
    private line2: Line;
    private arc: Arc;

    constructor({ x = 0, y = 0, radius = 0, startAngle = 0, endAngle = 0 } = {}, drawler = new GroupDrawler()) {
        super({x,y}, drawler)
        this.__radius = radius;
        this.__startAngle = startAngle;
        this.__endAngle = endAngle;
        this.___init(radius, startAngle, endAngle);
    }
    private ___init(radius: number, startAngle: number, endAngle: number) {
        this.line1 = new Line();
        this.line2 = new Line();
        this.arc = new Arc({radius, startAngle, endAngle});
        this.__startAngle = startAngle;
        this.__endAngle = endAngle;
        this.radius = radius;
        this.addFigure(this.line1);
        this.addFigure(this.line2);
        this.addFigure(this.arc);
    }

    set radius(value) {
        this.__radius = value;
        // console.log(this.__radius)
        this.arc.radius = value;
        
        this.__calc();
    }
    
    get radius() { return this.__radius; };

    set startAngle(value) {
        this.__startAngle = value;
        this.arc.startAngle = value;
        this.__calc();
    }

    get startAngle() { return this.__startAngle; }

    set endAngle(value) {
        this.__endAngle = value;
        this.arc.endAngle = value;
        this.__calc();
    }

    get endAngle() { return this.__endAngle; }
    
    private __calc_x(radius: number, angle: number) {
        return calc_leg_x(radius, angle) + this.arc.x + this.arc.radius;
    }
    
    private __calc_y(radius: number, angle: number) {
        return calc_leg_y(radius, angle) + this.arc.y + this.arc.radius;
    }

    private __calc() {
        this.line1.x0 = this.arc.radius;
        this.line2.x0 = this.arc.radius;
        this.line1.y0 = this.arc.radius;
        this.line2.y0 = this.arc.radius;
        this.line1.x1 = this.__calc_x(this.arc.radius, this.arc.startAngle);
        this.line1.y1 = this.__calc_y(this.arc.radius, this.arc.startAngle);
        this.line2.x1 = this.__calc_x(this.arc.radius, this.arc.endAngle);
        this.line2.y1 = this.__calc_y(this.arc.radius, this.arc.endAngle);
    }

    setRadiusTransition(t: Transition) {
        t.addChangeListener(() => this.__calc())
        this.arc.setRadiusTransition(t);
    }
    setStartAngleTransition(t: Transition) {
        t.addChangeListener(() => this.__calc())
        this.arc.setStartAngleTransition(t);
    }
    setEndAngleTransition(t: Transition) {
        t.addChangeListener(() => this.__calc())
        this.arc.setEndAngleTransition(t);
    }
}