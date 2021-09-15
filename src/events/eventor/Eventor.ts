import Canvas from "../../geometry/Canvas";
import { Event } from "../Event";

export abstract class Eventor<EventType extends Event, Eventable> {
    private canvas_el!: HTMLCanvasElement;
    private canvas!: Canvas;
    protected objects: Array<Eventable> = [];
    
    constructor() { }
    
    addListener(listener: Eventable) {
        this.objects.push(listener);
    }

    // constructor(canvas: Canvas) {
    //     this.subscribe(canvas);
    // }
    
    subscribe(canvas: Canvas) {
        this.canvas = canvas;
        this.canvas_el = canvas['element'];
        this.sub_element(this.canvas_el);
        return this;
    }
    protected abstract sub_element(canvas_el: HTMLCanvasElement):void;

}