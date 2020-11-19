export function createElement(type, attribute, ...children) {
    let element;
    if (typeof type === "string") {
        element = document.createElement(type)
    } else {
        element = new type;
    }

    for(let name in attribute) {
        element.setAttribute(name, attribute[name]);
    }

    for (let child of children) {
        if (typeof child === "string") {
            child = new TextWraper(child);
        }
        element.appendChild(child);
    }

    return element;
}

export class Component {
    constructor(type) {
        this.root = this.render();
    }

    render() {
        return document.createElement("div")
    }
    
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    } 
}

class ElementWraper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    } 
}

class TextWraper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }
    
}



