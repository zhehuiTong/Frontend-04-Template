import { Component, STATE, ATTRIBUTE } from './framework'
import { enableGesture } from './gesture'
import { Timeline, Animation } from './animation'
import { ease } from './ease'
export { STATE, ATTRIBUTE } from './framework'

export class Carousel extends Component {
    constructor() {
        super();
    }

    render() {
        this.root = document.createElement("div");
        for (let record of this[ATTRIBUTE].src) {
            let child = document.createElement("img");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        enableGesture(this.root)
        let timeline = new Timeline;
        timeline.start();

        let handler = null;

        this[STATE].position = 0

        let t = 0;
        let ax = 0;

        let children = this.root.children;

        this.root.addEventListener("start", event => {
            timeline.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 1500;
            ax = ease(progress) * 500 - 500;
        })

        this.root.addEventListener("tap", event => {
            this.triggerEvent("click", {
                data: this[ATTRIBUTE].src[this[STATE].position],
                position: this[STATE].position
            })
        })

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - Math.round((x - x % 500) / 500);
            for (let offest of [-1, 0, 1]) {
                let pos = current + offest;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${- pos * 500 + offest * 500 + x % 500}px)`
            }
        })

        this.root.addEventListener("panend", event => {
            timeline.reset();
            timeline.start();
            handler = setInterval(nextPicture, 3000)

            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - Math.round((x - x % 500) / 500);

            let direction = Math.round((x % 500) / 500);

            if (event.isFlick) {
                if (event.velocity < 0) {
                    direction = Math.ceil((x % 500) / 500);
                } else {
                    direction = Math.floor((x % 500) / 500);
                }
            }

            for (let offest of [-1, 0, 1]) {
                let pos = current + offest;
                pos = (pos % children.length + children.length) % children.length;

                children[pos].style.transition = "none";

                timeline.add(new Animation(children[pos].style, "transform",
                - this[STATE].position * 500 + offest * 500 + x % 500, 
                - pos * 500 + offest * 500 + direction * 500, 
                500, 0, ease, v => `translateX(${v}px)`));
            }

            this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;

            this.triggerEvent("Change", {position: this[STATE].position})
        })

        let nextPicture = () => {
            let children = this.root.children;
            let nextIndex = (this[STATE].position + 1) % children.length;

            let current = children[this[STATE].position];
            let next = children[nextIndex];

            timeline.add(new Animation(current.style, "transform",
                - this[STATE].position * 500, -500 - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`));
            timeline.add(new Animation(current.style, "transform",
                500 - this[STATE].position * 500, - this[STATE].position * 500, 500, 0, ease, v => `translateX(${v}px)`));

            this.triggerEvent("Change", {position: this[STATE].position})
            this[STATE].position = nextIndex;
        }

        handler = setInterval(nextPicture, 3000)

        return this.root
    }

}