import Canvas from "./geometry/Canvas" 
// import { Circle } from "./geometry/figures/Circle";
import Animator from "./geometry/animation/Animator";
import { Line } from "./geometry/figures/Line";
import Group from "./geometry/figures/group/Group";
import { Transform } from "./geometry/animation/Transform";
// import LineTranslate from "./geometry/animation/transforms/LineTranslate";
// import Group from "./geometry/figures/group/Group";
// import { Transform } from "./geometry/animation/Transform";
// import QuadraticCurve from "./geometry/figures/curves/Quadratic";
// import Arc from "./geometry/figures/curves/Arc";
// import Section from "./geometry/figures/complex/Section";
// import PieChart from "./geometry/figures/complex/charts/pie/Pie";
// import ChartData from "./geometry/figures/complex/charts/ChartData";
// import { cubic_bezie } from "./geometry/helpers/Animation";
// import CubicBezierCurve, { CubicBezierCurveDrawler, CubicBezierCurveDrawlerMy } from "./geometry/figures/curves/CubicBezier";
// import { Rectangle } from "./geometry/figures/Rectangle";

import { ChartData } from "./geometry/figures/complex/charts/ChartData";
import PieChart from "./geometry/figures/complex/charts/pie/Pie";
import { HoverEventor } from "./events/events/hover/HoverEventor";
import { Rectangle } from "./geometry/figures/Rectangle";
import Transition from "./geometry/animation/Transition";
import { cubic_bezie } from "./geometry/helpers/Animation";

const body = document.getElementsByTagName('body')[0];
const canvas_el = document.createElement('canvas');

body.appendChild(canvas_el);

canvas_el.width = 1000;
canvas_el.height = 600;

const canvas = new Canvas(canvas_el);

// const line = new Line({x: })

// const circle = new Circle({x: 200, y: 10, radius: 205});
// const group = new Group({x: 10, y: 0, figures: [circle, line]})

// const line = new Line({x: 10, y: 10, x1: 35, y1: 100});
// const line1 = new Line({x: 50, y: 10, x1: 35, y1: 100});

// const group = new Group({x: 50, y: 50 });
// group.addFigure(line);
// group.addFigure(line1);

// canvas.addFigure(group);


// const line_translate = new Transform(group, { x: 50, y: 50 })

// const anim1 = animator.makeAnimation({ duraction: 1000 }, line_translate);

// const curve = new QuadraticCurve({x: 50, y: 50, x1: 100, y1: 100, cpx: 75, cpy: 75});
// const arc = new Arc({x: 0, y: 0, radius: 15, startAngle: 0, endAngle: Math.PI});
// const anim1 = animator.makeAnimation(2000, new Transform(curve, { cpx: curve.x1 - 75, cpy: curve.y -75 }));
// canvas.addFigure(arc);
// console.log(canvas);


// const section = new Section({x: 0, y: 0, radius: 50, startAngle: 0, endAngle: Math.PI / 3 })
// canvas.addFigure(section);
// const anim2 = animator.makeAnimation(10000, new Transform(section, { }));

const data: ChartData = {title: 'test', values: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]}
const data2: ChartData = {title: 'test', values: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]}
const data3: ChartData = {title: 'test', values: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]}

const pie = new PieChart({x: 50, y: 30, radius: 100, start:4, end: 6, data: [
    data,
    data2,
    data3,
]})


canvas.addFigure(pie)

const rect1 = new Rectangle({x: 0, y: 500, width: 200, height: 100})
// const rect2 = new Rectangle({x: 100, y: 300, width: 200, height: 100})
const eventor = new HoverEventor();

eventor.subscribe(canvas);

canvas.addFigure(rect1)
rect1.setXTransition(new Transition({duraction: 1000, timing_function: cubic_bezie(.29,.09,.22,.98)}))

rect1.x = rect1.x + 200;



// const bezie1 = new CubicBezierCurve({x: 50, y: 20 ,x1: 230, y1: 30, x2: 150, y2: 60, x3: 50, y3: 100}, new CubicBezierCurveDrawler())
// const bezie2 = new CubicBezierCurve({x: 50, y: 25 ,x1: 230, y1: 35, x2: 150, y2: 65, x3: 50, y3: 105}, new CubicBezierCurveDrawlerMy())

// canvas.addFigure(bezie1)
// canvas.addFigure(bezie2)

// const rect2 = new Rectangle({x: 50, y: 260, width: 50, height: 50})

// canvas.addFigure(rect1)
// canvas.addFigure(rect2)

// const anim4 = animator.makeAnimation({duraction : 1000 }, new Transform(rect1, { x: 300 }));
// const anim5 = animator.makeAnimation({duraction : 1000, timing_function: cubic_bezie(.29,.09,.22,.98) }, new Transform(rect2, { x: 300 }));

// console.log(cubic_bezie(.5,.5,.5,.5));
