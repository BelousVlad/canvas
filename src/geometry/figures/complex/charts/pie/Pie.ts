import Transition from "../../../../animation/Transition";
import { ROUND } from "../../../../helpers/Math";
import { GroupDrawler } from "../../../group/Group";
import Section from "../../Section";
import { Chart, ChartArgs } from "../Chart";
import { ChartData } from "../ChartData";

type PieArg = ChartArgs & { radius: number };

export default class PieChart extends Chart {
    private __radius: number;
    private data_figure: Map<ChartData, Section>;
    private sections: Array<Section> = [];
    private anglesTransition: Transition;
    
    constructor(arg: PieArg , drawler = new GroupDrawler()) {
        super(arg, drawler);
        this.data_figure = new Map();
        this.__radius = arg.radius;
        // this.animator = new Animator();
        // this.cubic_bezie = cubic_bezie(.29,.09,.22,.98);
        this.___init();
    }

    private ___init() {
        for(const data_item of this.data) {
            this.__addFigure(data_item);
        }
        this.__calc_angles(true);
    }

    set radius(new_rad) {
        this.__radius = new_rad;
        for(const section of this.sections)
            section.radius = new_rad;
    }

    get radius() { return this.__radius; }

    __calc_angles(init = false) {
        let start = 0;

        const all_value = this.data.reduce((acc, item) => acc + this.__getDataFullValue(item), 0)

        
        for(const data_item of this.data) {
            const value = this.__getDataFullValue(data_item);
            // console.log(value)
            const percent = value / all_value;
            const section = this.data_figure.get(data_item)
            const added_angle = ROUND.FULL * percent;
            const end_angle = start + added_angle;

            console.log(start)
            section.startAngle = start;
            section.endAngle = end_angle;

            // if(init) {
                //     section.startAngle = start;
                //     section.endAngle = end_angle;
                // }
                // else {
                    //     this.animator.makeAnimation({ duraction: 1000, timing_function: this.cubic_bezie },
                    //         new Transform(section, { startAngle: start - section.startAngle, endAngle: end_angle - section.endAngle })
                    //     )
                    // }
                    
                    start = end_angle;
                }
            console.log(this)
    }   

    override pushData(newData: ChartData) {
        this.__addFigure(newData);
        const res = this.data.push(newData);
        this.__calc_angles();
        return res;
    }

    // setDataValue(data, distance, value) {
    //     const a = data.data.find((item) => item.distance == distance);
    //     a.value = value;
    //     this.__calc_angles();
    // }

    override refresh() {
        this.__calc_angles();
    }

    private __addFigure(data: ChartData) {
        const section = new Section({x: this.x, y: this.y, radius: this.radius, startAngle: ROUND.FULL, endAngle: ROUND.FULL });
        if(this.anglesTransition)
            section.setStartAngleTransition(this.anglesTransition);
        this.figures.push(section);
        this.sections.push(section);
        this.data_figure.set(data, section);
    }

    setAnglesTransaction(t: Transition) {
        this.anglesTransition = t;
        this.sections.forEach(section => {
            section.setStartAngleTransition(t);
            section.setEndAngleTransition(t);
            // section.set
        })
    }
} 