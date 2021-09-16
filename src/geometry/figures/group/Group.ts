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
        figure.shift_x = this.x + this.shift_x;
        figure.shift_y = this.y + this.shift_y;
        figure.group = this;
        this.figures.push(figure);
        this.__set_shifts();
    }

    public set x(new_x: number) {
        this.__x.value = new_x;
        this.__set_shifts();
    }

    public set y(new_y: number) {
        this.__y.value = new_y;
        this.__set_shifts();
    }

    public override get x() { return this.__x.value; }
    public override get y() { return this.__y.value; }

    private __init() {
        this.__set_shifts();
        this.__x.addChangeListeners(() => this.__set_shifts());
        this.__y.addChangeListeners(() => this.__set_shifts());
    }
    
    protected __set_shifts() {
        for(const fig of this.figures) {
            fig.shift_x = this.x + this.shift_x;
            fig.shift_y = this.y + this.shift_y;
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