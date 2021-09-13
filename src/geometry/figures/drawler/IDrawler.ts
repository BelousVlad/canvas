import { IDrawable } from "./IDrawable";

export interface IDrawler<T> {
    update(ctx: CanvasRenderingContext2D, element: IDrawable): void;
}