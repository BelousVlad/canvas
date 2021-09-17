export interface Translateable {
    get translate_x(): number;
    get translate_y(): number;

    translateX(_x: number): void;
    translateY(_y: number): void;
    translate(_x: number, y: number): void;
}