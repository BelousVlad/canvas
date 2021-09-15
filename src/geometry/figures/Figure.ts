import BaseFigure from "./BaseFigure";
import { IDrawable } from "./drawler/IDrawable";
import { IDrawler } from "./drawler/IDrawler";
import Group from "./group/Group";
import { IGroupable } from "./group/IGroupable";

export abstract class Figure extends BaseFigure implements IDrawable, IGroupable{
    
    drawler: IDrawler<Figure>
    group!: Group;
    shift_x: number = 0;
    shift_y: number = 0;
    
    constructor({x = 0, y = 0} = {}, drawler: IDrawler<Figure>) {
        super({x,y})
        this.drawler = drawler;
    }
    
    getDrawler(): IDrawler<Figure> {
        return this.drawler;
    }

    get realShiftX() { return this.shift_x + (this.group ? this.group.shift_x : 0)}
    get realShiftY() { return this.shift_y + (this.group ? this.group.shift_y : 0)}
}