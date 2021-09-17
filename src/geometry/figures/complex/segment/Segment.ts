import Transition from "../../../animation/Transition";
import { TransitionableProperty } from "../../../animation/TransitionableProperty";
import { calc_leg_x, calc_leg_y } from "../../../helpers/Math";
import Arc from "../../curves/Arc";
import Group, { GroupDrawler } from "../../group/Group";
import { Line } from "../../Line";
import { Point } from "../../Point";


export default class Segment extends Group {

    protected __radius: number;
    protected __startAngle: number;
    protected __endAngle: number;

    protected line1: Line;
    protected line2: Line;
    protected arc: Arc;

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

    protected __calc() {
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

    override isBelongPoint(p: Point) {
        let [cx, cy] = this.arc.center;
        const leg_a = p.y - (cy + this.y + this.realShiftY);
        const leg_b = p.x - (cx + this.x + this.realShiftX);
        
        const gyp2 = leg_a**2 + leg_b**2
        const gyp = Math.sqrt(gyp2);
        
        if(gyp <= this.arc.radius)
        {
            let rad = Math.atan(leg_a / leg_b)
            if(leg_b < 0)
                rad += Math.PI
            else if(leg_a < 0)
                rad += Math.PI * 2
            return rad >= this.arc.startAngle && rad <= this.arc.endAngle;
        }
        return false;   
    }

    onMouseEnter() {
        console.log('enter')
    }
}