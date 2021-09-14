export function curve_cubic_bezie(P1,P2,P3,P4) {
    return function(t) {
        return {
            x: Math.pow(1-t,3)*P1.x + 3*Math.pow(1-t,2)*t*P2.x + 3*(1-t)*Math.pow(t,2)*P3.x + Math.pow(t,3)*P4.x,
            y: Math.pow(1-t,3)*P1.y + 3*Math.pow(1-t,2)*t*P2.y + 3*(1-t)*Math.pow(t,2)*P3.y + Math.pow(t,3)*P4.y,
        }
    }
}