import Group, { GroupDrawler } from "../../group/Group";
import { ChartData } from "./ChartData";

export type ChartArgs = { x: number, y: number, data: Array<ChartData>, start: number, end: number };

export abstract class Chart extends Group{

    private __start: number;
    private __end: number;
    data: Array<ChartData>;

    constructor({
                x = 0,
                y = 0,
                data = [],
                start = 0,
                end = 0
            }: ChartArgs,
            drawler = new GroupDrawler()) {
        super({x,y}, drawler);
        this.data = data;
        this.__start = start;
        this.__end = end;
    }

    protected __getDataFullValue(data: ChartData) {
        return data.values.reduce((acc, item) => {
            if(this.__start <= item.distance && this.__end >= item.distance)
                return acc + item.value;
            return acc; 
        }, 0)
    }

    abstract refresh(): void;

    pushData(newData: ChartData) {
        return this.data.push(newData);
    }
};
