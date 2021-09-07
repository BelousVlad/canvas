export default class {
    constructor(element) {
        this.element = element;
        this.context = element.getContext('2d');
        this.figures = [];

        requestAnimationFrame(this.render.bind(this))
    }

    render(time) {
        this.context.clearRect(0,0, this.element.width, this.element.height);
        for(const figure of this.figures) {
            figure.drawler.update(this.context, time, figure)
        }

        requestAnimationFrame(this.render.bind(this))
    }

    addFigure(figure) {
        this.figures.push(figure);
        
        return this;
    }
} 