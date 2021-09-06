export default class {
    constructor(element) {
        this.element = element;
        this.context = element.getContext('2d');
        this.figures = new Map();

        requestAnimationFrame(this.render.bind(this))
    }

    render(time) {
        this.context.clearRect(0,0, this.element.width, this.element.height);

        for(const [drawler, figure] of this.figures) {
            drawler.update(this.context, time, figure)
        }

        requestAnimationFrame(this.render.bind(this))
    }

    addFigure(drawler, figure) {
        this.figures.set(drawler, figure);
        
        return this;
    }
} 