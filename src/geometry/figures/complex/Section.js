import Group, { GroupDrawler } from "../group/Group";
import { Line } from "../Line";
import QuadraticCurve from "../curves/Quadratic";
import Arc from "../curves/Arc";

export default class Section extends Group{
    constructor({x = 0, y = 0, radius = 0, startAngle = 0, endAngle = 0} = {}, drawler = new GroupDrawler()) {
        super({x,y})
        this.__radius = 0;
        this.__startAngle = 0;
        this.__endAngle = 0;
        this.__init(radius, startAngle, endAngle);
    }
    __init(radius, startAngle, endAngle) {
        this.line1 = new Line();
        this.line2 = new Line();
        this.arc = new Arc({x: this.x, y: this.y, radius, startAngle, endAngle});
        this.__startAngle = startAngle;
        this.__endAngle = endAngle;
        this.radius = radius;
        this.figures.push(this.line1, this.line2, this.arc);
    }

    set radius(value) {
        this.__radius = value;
        this.arc.radius = value;
        
        this.__calc();
    }
    
    get radius() { return this.__radius };

    set startAngle(value) {
        this.__startAngle = value;
        this.__calc();
    }

    get startAngle() { this.__startAngle; }

    set endAngle(value) {
        this.__endAngle = value;
        this.__calc();
    }

    get endAngle() { this.__endAngle; }
    
    __calc_x(radius, angle) {
        return radius * Math.cos(angle) + this.arc.center[0];
    }
    
    __calc_y(radius, angle) {
        return radius * Math.sin(angle) + this.arc.center[1];
    }

    __calc() {
        this.line1.x = this.x + this.__radius;
        this.line2.x = this.x + this.__radius;
        this.line1.y = this.y + this.__radius;
        this.line2.y = this.y + this.__radius;
        this.arc.x = this.x;
        this.arc.y = this.y;
        this.line1.x1 = this.__calc_x(this.__radius, this.__startAngle);
        this.line1.y1 = this.__calc_y(this.__radius, this.__startAngle);
        this.line2.x1 = this.__calc_x(this.__radius, this.__endAngle);
        this.line2.y1 = this.__calc_y(this.__radius, this.__endAngle);
        this.arc.startAngle = this.__startAngle;
        this.arc.endAngle = this.__endAngle;
    }

}