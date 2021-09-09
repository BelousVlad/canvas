// export function bezie(...points) {
//     // if(points.length === 0) {
//     //     // const distance = Math.sqrt(Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow( Math.abs(point1.y - point2.y) ,2))
//     //     const x = point2.x - point1.x;
//     //     const y = point2.y - point1.y;
//     //     return function(t) {
//     //         return {
//     //             x: (1-t)*point1.x + t*point2.x,
//     //             y: (1-t)*point1.y + t*point2.y,
//     //         }
//     //     }
//     // }

//     return function(t) {
//         const n = points.length;
        
//         return {
//             x: points.reduce((acc, val, k) => {
//                 return acc + Math.pow((1-t), n-k) * Math.pow(t,k)*val.x
//             }, 0),
//             y: points.reduce((acc, val, k) => {
//                 return acc + Math.pow((1-t), n-k) * Math.pow(t,k) * val.y
//             }, 0)
//         }
//     }
// }

export function cubic_bezie(P1,P2,P3,P4) {
    return function(t) {
        return {
            x: Math.pow(1-t,3)*P1.x + 3*Math.pow(1-t,2)*t*P2.x + 3*(1-t)*Math.pow(t,2)*P3.x + Math.pow(t,3)*P4.x,
            y: Math.pow(1-t,3)*P1.y + 3*Math.pow(1-t,2)*t*P2.y + 3*(1-t)*Math.pow(t,2)*P3.y + Math.pow(t,3)*P4.y,
        }
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