export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attributes")

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

    let processChildren = children => {
        for (let child of children) {
            if ((typeof child === "object") && (child instanceof Array)) {
                processChildren(child);
                continue;
            }
            if (typeof child === "string") {
                child = new TextWraper(child);
            }
            element.appendChild(child);
        }
    }

    processChildren(children)
    return element;
}

export class Component {
    constructor(type) {
        this.root = this.render();
        this.attributes = Object.create(null);
        this[STATE] = Object.create(null);
        this[ATTRIBUTE] = Object.create(null);
    }

    render() {
        return this.root
    }
    
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        if (!this.root) {
            this.render();
        }
        parent.appendChild(this.root);
    }
    triggerEvent(type, args) {
        this[ATTRIBUTE][`on${type}`](new CustomEvent(type, { detail: args }))
    }
}

class ElementWraper extends Component {
    constructor(type) {
        super()
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
}

class TextWraper extends Component {
    constructor(content) {
        super()
        this.root = document.createTextNode(content);
    }
}



