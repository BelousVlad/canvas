import { IDrawler } from "./IDrawler";

export interface IDrawable {
    getDrawler<T>(): IDrawler<T>;
}