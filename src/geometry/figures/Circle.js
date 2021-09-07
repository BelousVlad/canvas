import Drawler from '../Drawler';
import Arc from './curves/Arc';
import { ArcDrawler } from './curves/Arc';

export class Circle extends Arc{
    constructor({ x = 0, y = 0, radius = 0} = {}, drawler = new ArcDrawler()) {
        super({x,y, radius, startAngle: 0, endAngle: Math.PI * 2}, drawler)
    }
}