import { IDrawable } from "./IDrawable";
import { IDrawler } from "./IDrawler";

export abstract class Drawler<T> implements IDrawler<T> {
    abstract update(ctx: CanvasRenderingContext2D, element: IDrawable): void;

    begin(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
    }
    end(ctx: CanvasRenderingContext2D) {
        ctx.stroke();
        ctx.closePath();
    }
}