import { Component, createElement } from './framework'
import { Carousel } from './Carousel'
import {Timeline} from './animation'

let d = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
]

let a = <Carousel src={d} />

a.mountTo(document.body);

let t1 = new Timeline();

window.t1 = t1;
t1.add(new Animation({}, "a", 0, 100, 1000, null));

t1.start();
