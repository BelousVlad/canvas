import { curve_cubic_bezie } from "./Bezie"

export const ANIMATION = {
    CUBIC_BEZIER_STEP: 0.001,
    CUBIC_BEZIER_MAX: 1
}

export function cubic_bezie(x0,y0,x1,y1) {
    const curve = curve_cubic_bezie({ x:0, y:0 }, { x: x0, y: y0 }, { x:x1, y: y1 }, { x:1, y:1 })
    const step = ANIMATION.CUBIC_BEZIER_STEP;

    const bezier = [];
    const accurs = [0];

    for(let i = 0; i <= ANIMATION.CUBIC_BEZIER_MAX + ANIMATION.CUBIC_BEZIER_STEP ; i+=step) {
        bezier.push(curve(i));
    }

    let accuumulator = 0; 
    for(let i = 1; i < bezier.length; ++i) {
        const p1 = bezier[i-1];
        const p2 = bezier[i];

        accuumulator += Math.sqrt( Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y),2));
        accurs.push(accuumulator);
    }

    return function(t) {

        const progress = accuumulator * t;

        for(let i = 0; i < accurs.length; ++i) {
            if(accurs[i] >= progress) {
                return bezier[i].y;
            }
        }
        return bezier[accurs.length - 1].y;



        // return Math.sqrt( Math.pow(progress, 2) - Math.pow(t,2) )
    }
}

// export function cubic_bezie1(...P) {
//     return function(t) {
//         return {
//             x: ,
//             // y: Math.pow(1-t,3)*P1.y + 3*Math.pow(1-t,2)*t*P2.y + 3*(1-t)*Math.pow(t,2)*P3.y + Math.pow(t,3)*P4.y,
//         }
//     }
// }
// export function bezie_basis(t, ...coor) {
//     console.log(coor);
//     if(coor.length === 1)
//         return coor[0];
//     return (1-t) * bezie_basis(t, ...coor.slice(0, -1)) + t * bezie_basis(t, ...coor.slice(1))
// }