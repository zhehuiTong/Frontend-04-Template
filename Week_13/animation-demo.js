import { Timeline, Animation } from './animation.js'
import {ease} from './ease'

let t1 = new Timeline();

window.t1 = t1;
t1.add(new Animation(document.querySelector("#el").style, "transform", 0, 100, 1000, null, v => `translateX(${v})`));

t1.start();

document.querySelector("#pause-btn").addEventListener("click", () => t1.pause())