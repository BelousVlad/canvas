import { Point } from "../figures/Point";

export default interface CanBelongPoint {
    isBelongPoint(p: Point): boolean
}