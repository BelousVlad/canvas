import Canvas from "./geometry/Canvas" 
import { Circle, CircleDrawler } from "./geometry/figures/Circle";
import { Line, LineDrawler } from "./geometry/figures/Line";
import Animator from "./geometry/animation/Animator";
import LineTranslate from "./geometry/animation/transforms/LineTranslate";
import Group from "./geometry/figures/group/Group";
import { Transform } from "./geometry/animation/Transform";
import QuadraticCurve from "./geometry/figures/curves/Quadratic";
import Arc from "./geometry/figures/curves/Arc";
import Section from "./geometry/figures/complex/Section";
import PieChart from "./geometry/figures/complex/charts/pie/Pie";
import ChartData from "./geometry/figures/complex/charts/ChartData";
import { bezie_basis, cubic_bezie } from "./geometry/helpers/Animation";

const body = document.getElementsByTagName('body')[0];
const canvas_el = document.createElement('canvas');
canvas_el.style.width = '500px';
canvas_el.style.height = '300px';

body.appendChild(canvas_el);

canvas_el.width = 1000;
canvas_el.height = 600;

const canvas = new Canvas(canvas_el);

const animator = new Animator();

// const circle = new Circle({x: 200, y: 10, radius: 205});
// const line = new Line({x: 10, y: 10, x1: 35, y1: 100});
// const group = new Group({x: 10, y: 0, figures: [circle, line]})

// // canvas.addFigure(group);

// const line_translate = new Transform(line, {x: 50, y: 50, x1: 100, y1: -line.y1})

// // const anim2 = animator.makeAnimation(1000, line_translate);

// const curve = new QuadraticCurve({x: 50, y: 50, x1: 100, y1: 100, cpx: 75, cpy: 75});
// const arc = new Arc({x: 0, y: 0, radius: 15, startAngle: 0, endAngle: Math.PI});
// const anim1 = animator.makeAnimation(2000, new Transform(curve, { cpx: curve.x1 - 75, cpy: curve.y -75 }));
// canvas.addFigure(arc);
// console.log(canvas);


// const section = new Section({x: 0, y: 0, radius: 50, startAngle: 0, endAngle: Math.PI / 3 })
// canvas.addFigure(section);
// const anim2 = animator.makeAnimation(10000, new Transform(section, { }));

const data = new ChartData({title: 'test', data: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]})
const data2 = new ChartData({title: 'test2', data: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]})
const data3 = new ChartData({title: 'test3', data: [
    { distance: 0, value: 100 },
    { distance: 2, value: 50 },
    { distance: 4, value: 130 },
]})

const pie = new PieChart({x: 50, y: 30, radius: 100, data: [
    data,
    data2,
    data3,
]})

window.data = data;
window.data2 = data2;
window.data3 = data3;
window.pie = pie;

canvas.addFigure(pie)
// const anim1 = animator.makeAnimation({duraction : 3000 }, new Transform(pie, { radius: 100 }));

window.bezie = cubic_bezie;