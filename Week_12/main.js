import { Component, createElement } from './framework'

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    render() {
        this.root = document.createElement("div");
        for (let record of this.attributes.src) {
            let child = document.createElement("img");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let position = 0;

        this.root.addEventListener("mousedown", e => {
            let children = this.root.children;
            let startX = e.clientX;


            let move = e => {
                let x = e.clientX - startX;

                let current = position - Math.round(x / 500);

                for (let offest of [-1, 0, 1]) {
                    let pos = current + offest;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offest * 500 + x % 500}px)`
                }
            }

            let up = e => {
                let x = e.clientX - startX;

                position = position - Math.round(x / 500);


                for (let offest of [-1, 0, 1]) {
                    let pos = current + offest;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${- pos * 500 + offest * 500 + x % 500}px)`
                }
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
        
        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length;
            
        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     next.style.transition = "none";
        //     next.style.transform = `translateX(${-100 - currentIndex * 100})`;

        //     setTimeout(() => {
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        //         next.style.transform = `translateX(${- nextIndex * 100}%)`

        //         currentIndex = nextIndex;
        //     }, 16);


        // }, 3000)

        return this.root
    }
    
    setAttribute(name, value) {
        this.attribute[name] = value;
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.render());
    } 
}