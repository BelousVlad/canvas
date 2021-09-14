export const ROUND = {
    FULL: Math.PI * 2,
    HALF: Math.PI,
    QUARTER: Math.PI / 2,
};

export function calc_leg_x(hypotenuse: number, angle: number): number {
    return hypotenuse * Math.cos(angle);
}
export function calc_leg_y(hypotenuse: number, angle: number): number {
    return hypotenuse * Math.sin(angle);
}
