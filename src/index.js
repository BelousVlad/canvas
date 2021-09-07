import Canvas from "./geometry/Canvas" 
import { Circle, CircleDrawler } from "./geometry/figures/Circle";
import { Line, LineDrawler } from "./geometry/figures/Line";
import Animator from "./geometry/animation/Animator";
import LineTranslate from "./geometry/animation/transforms/LineTranslate";
import Group from "./geometry/figures/group/Group";
import { Transform } from "./geometry/animation/Transform";
import QuadraticCurve from "./geometry/figures/curves/Quadratic";

const body = document.getElementsByTagName('body')[0];
const canvas_el = document.createElement('canvas');

body.appendChild(canvas_el);

canvas_el.width = 500;
canvas_el.height = 300;

const canvas = new Canvas(canvas_el);

const animator = new Animator();

const circle = new Circle({x: 200, y: 10, radius: 205});
const line = new Line({x: 10, y: 10, x1: 35, y1: 100});
const group = new Group({x: 10, y: 0, figures: [circle, line]})

canvas.addFigure(group);

const line_translate = new Transform(line, {x: 50, y: 50, x1: 100, y1: -line.y1})

// const anim2 = animator.makeAnimation(1000, line_translate);

const curve = new QuadraticCurve({x: 50, y: 50, x1: 100, y1: 100, cpx: 75, cpy: 75});
const anim1 = animator.makeAnimation(2000, new Transform(curve, { cpx: curve.x1 - 75, cpy: curve.y -95 }));
canvas.addFigure(curve);
// console.log(canvas);