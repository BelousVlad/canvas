import { ROUND } from "../../../../helpers/Math";
import Group, { GroupDrawler } from "../../../group/Group";
import Section from "../../Section";
import Chart from "../Chart";

export default class PieChart extends Chart { 
    constructor({x = 0, y = 0, radius = 0, data = []}, drawler = new GroupDrawler()) {
        super({x,y, data}, drawler);
        this.data_figure = new Map();
        this.__radius = radius;
        this.__init(radius);
    }

    __init() {
        for(const data_item of this.data) {
            this.__addFigure(data_item);
        }
        this.__calc_angles();
    }

    set radius(new_rad) {
        this.__radius = new_rad;
        for(const section of this.figures)
            section.radius = new_rad;
    }

    get radius() { return this.__radius; }

    __calc_angles() {
        let start = 0;

        const all_value = this.data.reduce((acc, item) => acc + this.__getDataFullValue(item), 0)
        
        for(const data_item of this.data) {
            const value = this.__getDataFullValue(data_item);
            const percent = value / all_value;
            const section = this.data_figure.get(data_item)
            const added_angle = ROUND.FULL * percent;
            const end_angle = start + added_angle;
            section.startAngle = start;
            section.endAngle = end_angle;
            start = end_angle;
        }
    }

    pushData(newData) { //override
        this.__addFigure(newData);
        const res = this.data.push(newData);
        this.__calc_angles();
        return res;
    }

    setDataValue(data, distance, value) {
        const a = data.data.find((item) => item.distance == distance);
        a.value = value;
        this.__calc_angles();
    }

    __addFigure(data) {
        const section = new Section({x: this.x, y: this.y, radius: this.radius });
        this.figures.push(section);
        this.data_figure.set(data, section);
    }
} 