import { Drawler } from "../drawler/Drawler";
import { Figure } from "../Figure";

export default class Group extends Figure{

    figures: Array<Figure>;

    constructor({x = 0, y = 0, figures = []} = { figures: Array<Figure>() }, drawler = new GroupDrawler()) {
        super({x,y}, drawler);
        this.figures = figures;
        this.__init();
    }

    public addFigure(figure: Figure) {
        figure.shift_x = this.x;
        figure.shift_y = this.y;
        this.figures.push(figure);
    }

    public override set x(new_x: number) {
        this.__x = new_x;
        this.__set_shifts();
    }

    public override set y(new_y: number) {
        this.__y = new_y;
        this.__set_shifts();
    }

    public override get x() { return this.__x; }
    public override get y() { return this.__y; }

    private __init() {
        this.__set_shifts();
    }
    
    private __set_shifts() {
        for(const fig of this.figures) {
            fig.shift_x = this.x;
            fig.shift_y = this.y;
        }
    }
}

export class GroupDrawler extends Drawler<Group>{
    update(ctx: CanvasRenderingContext2D, group: Group) {
        for(const figure of group.figures) {
            figure.getDrawler().update(ctx, figure);
        }
    }
}