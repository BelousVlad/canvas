import Canvas from "./geometry/Canvas" 
import { Circle, CircleDrawler } from "./geometry/figures/Circle";
import { Line, LineDrawler } from "./geometry/figures/Line";
import Animator from "./geometry/animation/Animator";
import LineTranslate from "./geometry/animation/transforms/LineTranslate";

const body = document.getElementsByTagName('body')[0];
const canvas_el = document.createElement('canvas');

body.appendChild(canvas_el);

canvas_el.width = 500;
canvas_el.height = 300;

const canvas = new Canvas(canvas_el);

const animator = new Animator();

const circle = new Circle({x: 200, y: 10, radius: 205});
const line = new Line({x: 10, y: 10, x1: 35, y1: 100});
// canvas.addFigure(new CircleDrawler(), circle);
canvas.addFigure(new LineDrawler(), line);

const line_translate = new LineTranslate(line, {x_delta: 50, y_delta: 50})

// const anim = animator.makeAnimation(circle.x + 130, 10000);
const anim2 = animator.makeAnimation(1000, line_translate);
// anim.from = circle.x;
// animator.onUpdate(anim, (val) => { circle.x = val})
// animator.onUpdate(anim2, (val) => { line.x1 = val})