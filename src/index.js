import Canvas from "./geometry/Canvas" 
import { Circle, CircleDrawler } from "./geometry/figures/Circle";
import Animator from "./geometry/animation/Animator";

const body = document.getElementsByTagName('body')[0];
const canvas_el = document.createElement('canvas');

body.appendChild(canvas_el);

canvas_el.width = 500;
canvas_el.height = 300;

const canvas = new Canvas(canvas_el);

const animator = new Animator();

const circle = new Circle({x: 10, y: 10, radius: 25});
canvas.addFigure(new CircleDrawler(), circle);

const anim = animator.makeAnimation(circle.x + 30, 1000);
anim.from = circle.x;
animator.onUpdate(anim, (val) => { circle.x = val})