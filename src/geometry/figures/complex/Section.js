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
        this.arc = new Arc();
        this.figures.push(this.line1, this.line2, this.arc);
        
        this.__startAngle = startAngle;
        this.__endAngle = endAngle;
        this.radius = radius;
        

        this.line1.x = this.x + this
    }

    __calc_x(radius, angle) {
        return radius / Math.cos(angle);
    }

    __calc_y(radius, angle) {
        return radius / Math.sin(angle);
    }

    set radius(value) {
        this.__radius = value;
        this.line1.x = this.line2.x = this.x + value;
        this.line1.y = this.line2.y = this.y + value;
        this.line1.x1 = this.__calc_x(value, this.__startAngle);
        this.line1.y1 = this.__calc_y(value, this.__startAngle);
        this.line2.x1 = this.__calc_x(value, this.__endAngle);
        this.line2.y1 = this.__calc_y(value, this.__endAngle);
    }

    get radius() {return this.__radius };

}