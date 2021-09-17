import CanBelongPoint from "../../../geometry/interfaces/CanBeloungPoint";
import { HoverEvent } from "./HoverEvent";

export interface Hoverable extends CanBelongPoint{
    onMouseEnter(event: HoverEvent): void;
    onMouseOut(event: HoverEvent): void;
    onMouseMove(event: HoverEvent): void;
}