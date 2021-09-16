import { curve_cubic_bezie } from "./Bezie"

// export const ANIMATION = {
//     CUBIC_BEZIER_STEP: 0.001,
//     CUBIC_BEZIER_MAX: 1
// }

// export function cubic_bezie(x0,y0,x1,y1) {
//     const curve = curve_cubic_bezie({ x:0, y:0 }, { x: x0, y: y0 }, { x:x1, y: y1 }, { x:1, y:1 })
//     const step = ANIMATION.CUBIC_BEZIER_STEP;

//     const bezier = [];
//     const accurs = [0];

//     for(let i = 0; i <= ANIMATION.CUBIC_BEZIER_MAX + ANIMATION.CUBIC_BEZIER_STEP ; i+=step) {
//         bezier.push(curve(i));
//     }

//     let accuumulator = 0; 
//     for(let i = 1; i < bezier.length; ++i) {
//         const p1 = bezier[i-1];
//         const p2 = bezier[i];

//         accuumulator += Math.sqrt( Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y),2));
//         accurs.push(accuumulator);
//     }

//     return function(t) {

//         const progress = accuumulator * t;

//         for(let i = 0; i < accurs.length; ++i) {
//             if(accurs[i] >= progress) {
//                 return bezier[i].y;
//             }
//         }
//         return bezier[accurs.length - 1].y;



//         // return Math.sqrt( Math.pow(progress, 2) - Math.pow(t,2) )
//     }
// }

var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function LinearEasing (x) {
  return x;
}

export function cubic_bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  if (mX1 === mY1 && mX2 === mY2) {
    return LinearEasing;
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  for (var i = 0; i < kSplineTableSize; ++i) {
    sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0 || x === 1) {
      return x;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};

export function cubic_bezier_1(x1,y1,x2,y2) {
    //3t(1−t)^2⋅x1+3(t^2)(1−t)⋅x2+t^3
    //
    
    return function(t) {
        //Math.pow(1-t,3)*P1.x + 3*Math.pow(1-t,2)*t*P2.x + 3*(1-t)*Math.pow(t,2)*P3.x + Math.pow(t,3)*P4.x
        //3(1-t)^2*t*y1 + 3*(1-t)*t^2*y2 + t^3
        //t2·(3-3·t)+3·a·(1-t)2
        return fn(t).y;
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