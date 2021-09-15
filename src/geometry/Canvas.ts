import { IDrawable } from "./figures/drawler/IDrawable";

export default class Canvas{
    private context: CanvasRenderingContext2D;
    private figures: Array<IDrawable>;

    constructor(private element: HTMLCanvasElement) {
        this.element = element;
        this.context = element.getContext('2d');
        this.figures = [];

        requestAnimationFrame(this.render.bind(this))
    }

    render() {
        this.context.clearRect(0,0, this.element.width, this.element.height);
        for(const figure of this.figures) {
            figure.getDrawler().update(this.context, figure)
        }

        requestAnimationFrame(this.render.bind(this))
    }

    addFigure(figure: IDrawable) {
        this.figures.push(figure);
        
        return this;
    }
} 