import { HoverEventor } from "../../../../../events/events/hover/HoverEventor";
import Transition from "../../../../animation/Transition";
import { cubic_bezier } from "../../../../helpers/Animation";
import { ROUND } from "../../../../helpers/Math";
import { GroupDrawler } from "../../../group/Group";
import Segment from "../../segment/Segment";
import { Chart, ChartArgs } from "../Chart";
import { ChartData } from "../ChartData";
import { PieSegment } from "./PieSegment";

type PieArg = ChartArgs & { radius: number };

export default class PieChart extends Chart {
    private __radius: number;
    private data_figure: Map<ChartData, Segment>;
    private segments: Array<Segment> = [];
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
        this.__calc_angles();
    }

    set radius(new_rad) {
        this.__radius = new_rad;
        for(const section of this.segments)
            section.radius = new_rad;
    }

    get radius() { return this.__radius; }

    __calc_angles() {
        let start = 0;

        const all_value = this.data.reduce((acc, item) => acc + this.__getDataFullValue(item), 0)

        
        for(const data_item of this.data) {
            const value = this.__getDataFullValue(data_item);
            // console.log(value)
            const percent = value / all_value;
            const segments = this.data_figure.get(data_item)
            const added_angle = ROUND.FULL * percent;
            const end_angle = start + added_angle;

            console.log(start)
            segments.startAngle = start;
            segments.endAngle = end_angle;
            start = end_angle;
        }
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
        const segment = new PieSegment({x: this.x, y: this.y, radius: this.radius, startAngle: ROUND.FULL, endAngle: ROUND.FULL });
        segment.setTranslateTransition(new Transition({duraction: 500, timing_function: cubic_bezier(.29,.09,.22,.98)}))
        if(this.anglesTransition)
        segment.setStartAngleTransition(this.anglesTransition);
        this.figures.push(segment);
        this.segments.push(segment);
        this.data_figure.set(data, segment);
    }

    setAnglesTransaction(t: Transition) {
        this.anglesTransition = t;
        this.segments.forEach(segment => {
            segment.setStartAngleTransition(t);
            segment.setEndAngleTransition(t);
        })
    }

    test(eventor: HoverEventor) {
        for(const seg of this.segments)
            eventor.addListener(seg);
    }
} 